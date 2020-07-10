import { Field, ObjectType } from 'type-graphql';


@ObjectType()
export class Product {

    @Field()
    name?: string;

    @Field()
    description?: string;
}