import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrdersRepository } from './orders.repository';
import { CreateOrderInput } from './input/create-order.input';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private productsService: ProductsService,
  ) {}

  getOrders() {
    return this.ordersRepository.getOrders();
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne(id);

    if (!order) {
      throw new NotFoundException('Order does not exist');
    }

    return order;
  }

  async createOrder(input: CreateOrderInput) {
    const products = await this.productsService.getManyProducts(
      input.productIds,
    );

    if (!products.length) {
      throw new BadRequestException();
    }

    return this.ordersRepository.createOrder(products);
  }
}
