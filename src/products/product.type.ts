import { Field, ID, ObjectType } from '@nestjs/graphql';

import { CategoryType } from '../categories/category.type';

@ObjectType('Product')
export class ProductType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  price: number;

  @Field((type) => CategoryType)
  category: string;
}
