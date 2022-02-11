import { EntityRepository, Repository } from 'typeorm';

import { Order } from './order.entity';
import { Product } from '../products/product.entity';
import { OrderStatus } from './order-status.enum';
import { User } from '../auth/user.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async createOrder(products: Product[], user: User) {
    const order = this.create({
      status: OrderStatus.OPEN,
      products,
      user,
    });

    await this.save(order);

    return order;
  }

  getOrders(user: User) {
    const query = this.createQueryBuilder('order');

    query.where({ user });

    query.leftJoinAndSelect('order.products', 'product');

    return query.getMany();
  }
}
