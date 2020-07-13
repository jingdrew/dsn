import { Column, Entity } from 'typeorm';
import { Parent } from './parent.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends Parent {

    @Field()
    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Field()
    @Column({ nullable: false, unique: true })
    email: string;

    @Field()
    @Column({ nullable: false, name: 'first_name' })
    firstName: string;

    @Field()
    @Column({ nullable: false, name: 'last_name' })
    lastName: string;

    @Column({ nullable: true })
    token: string;

    constructor(
        username: string, password: string, firstName: string,
        lastName: string, email: string
    ) {
        super();
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = '';
    }
}