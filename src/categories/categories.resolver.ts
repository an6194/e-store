import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoriesService } from './categories.service';
import { CategoryType } from './category.type';
import { CreateCategoryInput } from './input/create-category.input';
import { CategoriesFilterInput } from './input/categories-filter.input';

@Resolver((of) => CategoryType)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query((returns) => [CategoryType])
  categories(
    @Args('filterInput', { nullable: true, defaultValue: {} })
    filterInput: CategoriesFilterInput,
  ) {
    return this.categoriesService.getCategories(filterInput);
  }

  @Query((returns) => CategoryType)
  category(@Args('id') id: string) {
    return this.categoriesService.getCategory(id);
  }

  @Mutation((returns) => CategoryType)
  createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoriesService.createCategory(input);
  }
}
