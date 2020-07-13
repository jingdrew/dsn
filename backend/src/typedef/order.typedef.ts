import { Field, InputType, Int } from 'type-graphql';
import { OrderStatus, SortOrder } from './enum.typedef';
import { IsOptional } from 'class-validator';

@InputType()
export class OrderItems {

    @Field()
    item!: number;
}

@InputType()
export class OrderInput {

    @Field()
    ordNumber!: string;

    @Field({ nullable: true })
    @IsOptional()
    notes!: string;

    @Field()
    clientId!: number;

    @Field(() => [Int])
    items!: [number];

    @Field()
    orderStatus!: OrderStatus;
}