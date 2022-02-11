import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ProductType } from '../products/product.type';
import { OrderStatus } from './order-status.enum';

@ObjectType('Order')
export class OrderType {
  @Field((type) => ID)
  id: string;

  @Field()
  status: OrderStatus;

  @Field((type) => [ProductType])
  products: string[];
}
