import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ProductsService } from './products.service';
import { ProductType } from './product.type';
import { CreateProductInput } from './input/create-product.input';
import { ProductsFilterInput } from './input/products-filter.input';
import { CategoriesService } from '../categories/categories.service';

@Resolver((of) => ProductType)
export class ProductsResolver {
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  @Query((returns) => [ProductType])
  products(
    @Args('filterInput', { nullable: true, defaultValue: {} })
    filterInput: ProductsFilterInput,
  ) {
    return this.productsService.getProducts(filterInput);
  }

  @Query((returns) => ProductType)
  product(@Args('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Mutation((returns) => ProductType)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.createProduct(input);
  }

  @ResolveField()
  category(@Parent() product: ProductType) {
    return this.categoriesService.getCategory(product.category);
  }
}
