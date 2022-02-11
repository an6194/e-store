import { EntityRepository, Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductInput } from './input/create-product.input';
import { ProductsFilterInput } from './input/products-filter.input';
import { Category } from '../categories/category.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async createProduct(input: CreateProductInput, category: Category) {
    const { name, slug, price } = input;

    const product = this.create({
      name,
      slug,
      price,
      category,
    });

    await this.save(product);

    return product;
  }

  async getProducts(filterInput: ProductsFilterInput) {
    const { search } = filterInput;

    const query = this.createQueryBuilder('product');

    if (search) {
      query.andWhere('LOWER(product.slug) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    return await query.getMany();
  }
}
