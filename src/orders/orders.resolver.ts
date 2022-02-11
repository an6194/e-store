import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrderType } from './order.type';
import { CreateOrderInput } from './input/create-order.input';
import { ProductsService } from '../products/products.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Resolver((of) => OrderType)
@UseGuards(GqlAuthGuard)
export class OrdersResolver {
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  @Query((returns) => [OrderType])
  orders(@GetUser() user: User) {
    return this.ordersService.getOrders(user);
  }

  @Query((returns) => OrderType)
  order(@Args('id') id: string, @GetUser() user: User) {
    return this.ordersService.getOrder(id, user);
  }

  @Mutation((returns) => OrderType)
  createOrder(@Args('input') input: CreateOrderInput, @GetUser() user: User) {
    return this.ordersService.createOrder(input, user);
  }

  @ResolveField()
  products(@Parent() order: OrderType) {
    return this.productsService.getManyProducts(order.products);
  }
}
