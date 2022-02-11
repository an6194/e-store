import { EntityRepository, Repository } from 'typeorm';

import { Order } from './order.entity';
import { Product } from '../products/product.entity';
import { OrderStatus } from './order-status.enum';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async createOrder(products: Product[]) {
    const order = this.create({
      status: OrderStatus.OPEN,
      products,
    });

    await this.save(order);

    return order;
  }

  getOrders() {
    const query = this.createQueryBuilder('order');

    query.leftJoinAndSelect('order.products', 'product');

    return query.getMany();
  }
}
