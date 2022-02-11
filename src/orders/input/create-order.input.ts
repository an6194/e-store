import { Field, ID, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  @Field((type) => [ID])
  productIds: string[];
}
