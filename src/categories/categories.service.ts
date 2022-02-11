import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoriesRepository } from './categories.repository';
import { CreateCategoryInput } from './input/create-category.input';
import { CategoriesFilterInput } from './input/categories-filter.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  getCategories(filterInput: CategoriesFilterInput) {
    return this.categoriesRepository.getCategories(filterInput);
  }

  async getCategory(id: string) {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category does not exist');
    }

    return category;
  }

  createCategory(input: CreateCategoryInput) {
    return this.categoriesRepository.createCategory(input);
  }
}
