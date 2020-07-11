import { Field, InputType, ObjectType } from 'type-graphql';
import { MinLength } from 'class-validator';

@ObjectType()
export class Token {

    @Field()
    token!: string
}

@InputType()
export class AuthInput {

    @Field()
    @MinLength(4)
    username!: string;

    @Field()
    @MinLength(6)
    password!: string;
}


@InputType()
export class UserInput {

    @Field()
    @MinLength(4)
    username!: string;

    @Field()
    @MinLength(6)
    password!: string;

    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    email!: string;
}