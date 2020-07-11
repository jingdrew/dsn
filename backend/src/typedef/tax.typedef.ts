import { Field, InputType } from 'type-graphql';

@InputType()
export class TaxInput {

    @Field()
    name!: string;

    @Field({nullable: true})
    description?: string;

    @Field()
    value!: number;
}