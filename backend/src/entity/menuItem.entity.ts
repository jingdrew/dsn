import { Parent } from './parent.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Product } from './product.entity';
import { Tax } from './tax.entity';
import { Order } from './order.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('items')
export class MenuItem extends Parent {

    @Field()
    @Column({unique: true})
    code: string;

    @Field()
    @Column({ type: 'float', default: 0.0 })
    price: number;

    @ManyToOne(type => Tax)
    tax: Tax;

    @ManyToOne(type => Product)
    product: Product;

    @OneToMany(type => Order, order => order.items)
    order?: Order;

    constructor(code: string, price: number, tax: Tax, product: Product) {
        super();
        this.code = code;
        this.price = price;
        this.tax = tax;
        this.product = product;
    }
}