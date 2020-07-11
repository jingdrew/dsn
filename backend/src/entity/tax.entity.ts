import { Parent } from './parent.entity';
import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity("taxes")
export class Tax extends Parent {

    @Field()
    @Column({ nullable: false })
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column({ nullable: false })
    value: number;

    constructor(name: string, description: string, tax: number) {
        super();
        this.value = tax;
        this.name = name;
        this.description = description;
    }
}