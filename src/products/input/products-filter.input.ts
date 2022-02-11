import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ProductsFilterInput {
  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  search?: string;
}
