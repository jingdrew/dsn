import { Field, InputType, Float } from 'type-graphql';
import { SortOrder } from './enum.typedef';

@InputType()
export class ItemInput {
  @Field()
  code!: string;

  @Field(() => Float)
  price!: number;

  @Field()
  taxId!: number;

  @Field()
  productId!: number;
}

@InputType()
export class ItemFilter {
  @Field({ nullable: true })
  code!: string;

  @Field()
  limit: number = 10;

  @Field()
  skip: number = 0;

  @Field()
  order: SortOrder = SortOrder.ASC;
}
