import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductsRepository } from './products.repository';
import { CreateProductInput } from './input/create-product.input';
import { ProductsFilterInput } from './input/products-filter.input';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    private categoriesService: CategoriesService,
  ) {}

  getProducts(filterInput: ProductsFilterInput) {
    return this.productsRepository.getProducts(filterInput);
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product does not exist');
    }

    return product;
  }

  async createProduct(input: CreateProductInput) {
    const category = await this.categoriesService.getCategory(input.category);

    return this.productsRepository.createProduct(input, category);
  }
}
