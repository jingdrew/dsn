import { Field, InputType } from 'type-graphql';
import { SortOrder } from './enum.typedef';
import { IsEmail } from 'class-validator';

@InputType()
export class ClientInput {

    @Field()
    fullName!: string;

    @Field()
    address!: string;

    @Field({ nullable: true })
    @IsEmail()
    email!: string;

    @Field()
    phoneNumber!: string;
}

@InputType()
export class ClientFilter {
    @Field({nullable: true})
    id!: number;

    @Field({nullable: true})
    email!: string;

    @Field({nullable: true})
    phoneNumber!: string;

    @Field({nullable: true})
    nameLike!: string;

    @Field({nullable: true})
    addressLike!: string;

    @Field()
    limit: number = 10;

    @Field()
    skip: number = 0;

    @Field()
    order: SortOrder = SortOrder.ASC;

}