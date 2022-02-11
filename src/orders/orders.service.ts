import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrdersRepository } from './orders.repository';
import { CreateOrderInput } from './input/create-order.input';
import { ProductsService } from '../products/products.service';
import { User } from '../auth/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private productsService: ProductsService,
  ) {}

  getOrders(user: User) {
    return this.ordersRepository.getOrders(user);
  }

  async getOrder(id: string, user: User) {
    const order = await this.ordersRepository.findOne({ id, user });

    if (!order) {
      throw new NotFoundException('Order does not exist');
    }

    return order;
  }

  async createOrder(input: CreateOrderInput, user: User) {
    const products = await this.productsService.getManyProducts(
      input.productIds,
    );

    if (!products.length) {
      throw new BadRequestException();
    }

    return this.ordersRepository.createOrder(products, user);
  }
}
