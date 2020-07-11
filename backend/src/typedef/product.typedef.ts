import { Field, InputType } from 'type-graphql';

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
    id?: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;
}