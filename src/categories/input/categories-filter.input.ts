import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CategoriesFilterInput {
  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  search?: string;
}
