import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from '../categories/category.entity';

const PRICE_PRECISION = 12;
const PRICE_SCALE = 2;
export const MAX_PRICE = 10 ** (PRICE_PRECISION - PRICE_SCALE);

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'numeric', precision: PRICE_PRECISION, scale: PRICE_SCALE })
  price: number;

  @ManyToOne((type) => Category, (category) => category.products)
  category: Category;
}
