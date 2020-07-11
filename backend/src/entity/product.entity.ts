import { Parent } from './parent.entity';
import { Column, Entity, } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('products')
export class Product extends Parent {

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }
}