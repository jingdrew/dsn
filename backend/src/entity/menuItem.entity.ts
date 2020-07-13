import { Parent } from './parent.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Product } from './product.entity';
import { Tax } from './tax.entity';
import { Order } from './order.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('menu_items')
export class MenuItem extends Parent {

    @Field()
    @Column({ unique: true })
    code: string;

    @Field()
    @Column({ type: 'float', default: 0.0 })
    price: number;

    @Field(() => Tax, )
    @ManyToOne(type => Tax, {eager: true})
    @JoinColumn({name: 'tax_id'})
    tax: Tax;

    @Field(() => Product, )
    @ManyToOne(type => Product, {eager: true})
    @JoinColumn({name: 'product_id'})
    product: Product;

    constructor(code: string, price: number, tax: Tax, product: Product) {
        super();
        this.code = code;
        this.price = price;
        this.tax = tax;
        this.product = product;
    }
}