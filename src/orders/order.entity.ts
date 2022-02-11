import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { OrderStatus } from './order-status.enum';
import { Product } from '../products/product.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: OrderStatus;

  @JoinTable()
  @ManyToMany((type) => Product, { eager: true })
  products: Product[];

  @ManyToOne((type) => User, (user) => user.orders)
  user: User;
}
