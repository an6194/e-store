import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { OrdersService } from './orders.service';
import { OrderType } from './order.type';
import { CreateOrderInput } from './input/create-order.input';
import { ProductsService } from '../products/products.service';

@Resolver((of) => OrderType)
export class OrdersResolver {
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  @Query((returns) => [OrderType])
  orders() {
    return this.ordersService.getOrders();
  }

  @Query((returns) => OrderType)
  order(@Args('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Mutation((returns) => OrderType)
  createOrder(@Args('input') input: CreateOrderInput) {
    return this.ordersService.createOrder(input);
  }

  @ResolveField()
  products(@Parent() order: OrderType) {
    return this.productsService.getManyProducts(order.products);
  }
}
