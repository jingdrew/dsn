import { Field, InputType } from 'type-graphql';
import { SortOrder } from './enum.typedef';

@InputType()
export class ProductInput {

    @Field()
    name!: string;

    @Field()
    description!: string;
}

@InputType()
export class ProductFilter {
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