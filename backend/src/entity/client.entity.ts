import { Column, Entity, Index } from 'typeorm';
import { Parent } from './parent.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity("clients")
export class Client extends Parent {

    @Field()
    @Column({ nullable: false })
    fullName: string;

    @Field()
    @Column()
    address: string;

    @Field({nullable: true})
    @Column({nullable: true})
    email: string;

    @Field()
    @Column({ unique: true, nullable: false })
    @Index()
    phoneNumber: string;

    constructor(fullName: string, address: string, email: string, phoneNumber: string) {
        super();
        this.fullName = fullName;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}