import { Field, InputType, ObjectType } from 'type-graphql';
import { MinLength } from 'class-validator';

@InputType()
export class InputUser {
    @Field()
    @MinLength(4)
    username?: string;

    @Field()
    @MinLength(6)
    password?: string;

    @Field()
    firstName?: string;

    @Field()
    lastName?: string;

    @Field()
    email?: string;
}

@ObjectType()
export class User {

    @Field()
    username?: string;

    @Field()
    password?: string;
}