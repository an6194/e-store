import { EntityRepository, Repository } from 'typeorm';

import { Category } from './category.entity';
import { CreateCategoryInput } from './input/create-category.input';
import { CategoriesFilterInput } from './input/categories-filter.input';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async createCategory(input: CreateCategoryInput) {
    const { name, slug } = input;

    const category = this.create({
      name,
      slug,
    });

    await this.save(category);

    return category;
  }

  async getCategories(filterInput: CategoriesFilterInput) {
    const { search } = filterInput;

    const query = this.createQueryBuilder('category');

    if (search) {
      query.andWhere('LOWER(category.slug) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    return await query.getMany();
  }
}
