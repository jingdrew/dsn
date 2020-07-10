import { ParentEntity } from './parent.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { TaxEntity } from './tax.entity';
import { OrderEntity } from './order.entity';

@Entity("items")
export class MenuItemEntity extends ParentEntity{

    @Column()
    code: string;

    @Column()
    price: number;

    @OneToOne(type => TaxEntity)
    @JoinColumn()
    tax: TaxEntity

    @OneToOne(type => ProductEntity)
    @JoinColumn()
    product: ProductEntity;

    @OneToMany(type => OrderEntity, order => order.items)
    order?: OrderEntity;

    constructor(code: string, price:number, tax: TaxEntity, product: ProductEntity) {
        super();
        this.code = code;
        this.price = price;
        this.tax = tax;
        this.product = product;
    }


}