import { Field, InputType, Float } from 'type-graphql';
import { SortOrder } from './enum.typedef';

@InputType()
export class TaxInput {

    @Field()
    name!: string;

    @Field({ nullable: true })
    description: string = '';

    @Field(() => Float)
    value!: number;
}

@InputType()
export class TaxFilter {

    @Field({ nullable: true })
    id?: number;

    @Field({ nullable: true })
    nameLike?: string;

    @Field()
    limit: number = 10;

    @Field()
    skip: number = 0;

    @Field()
    order: SortOrder = SortOrder.ASC;
}