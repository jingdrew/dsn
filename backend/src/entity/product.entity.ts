import { Parent } from './parent.entity';
import { Column, Entity, OneToMany, } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { MenuItem } from './menuItem.entity';

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