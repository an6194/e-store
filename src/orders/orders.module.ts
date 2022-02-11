import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { OrdersRepository } from './orders.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersRepository]), ProductsModule],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
