import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductsRepository } from './products.repository';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository]), CategoriesModule],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
