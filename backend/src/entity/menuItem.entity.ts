import { Parent } from './parent.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Product } from './product.entity';
import { Tax } from './tax.entity';
import { Order } from './order.entity';

@Entity("items")
export class MenuItem extends Parent{

    @Column()
    code: string;

    @Column()
    price: number;

    @OneToOne(type => Tax)
    @JoinColumn()
    tax: Tax

    @OneToOne(type => Product)
    @JoinColumn()
    product: Product;

    @OneToMany(type => Order, order => order.items)
    order?: Order;

    constructor(code: string, price:number, tax: Tax, product: Product) {
        super();
        this.code = code;
        this.price = price;
        this.tax = tax;
        this.product = product;
    }
}