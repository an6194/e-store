import { Field, ID, InputType } from '@nestjs/graphql';
import { IsPositive, IsUUID, Max, MinLength } from 'class-validator';

import { MAX_PRICE } from '../product.entity';

@InputType()
export class CreateProductInput {
  @MinLength(1)
  @Field()
  name: string;

  @MinLength(1)
  @Field()
  slug: string;

  @IsPositive()
  @Max(MAX_PRICE - 1)
  @Field()
  price: number;

  @IsUUID()
  @Field((type) => ID)
  category: string;
}
