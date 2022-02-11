import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

import { OrderStatus } from './order-status.enum';
import { Product } from '../products/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: OrderStatus;

  @JoinTable()
  @ManyToMany((type) => Product, { eager: true })
  products: Product[];
}
