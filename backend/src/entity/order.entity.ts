import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { Parent } from './parent.entity';
import { MenuItem } from './menuItem.entity';
import { Client } from './client.entity';
import { Field, ObjectType } from 'type-graphql';
import { OrderStatus } from '../typedef/enum.typedef';
import { Product } from './product.entity';

@ObjectType()
@Entity('orders')
export class Order extends Parent {

    @Field()
    @Column({ name: 'ord_number' })
    ordNumber: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    notes: string;

    @Field()
    @Column({ name: 'status' })
    orderStatus: OrderStatus;

    @Field(() => [MenuItem])
    @ManyToMany(type => MenuItem, { eager: true })
    @JoinTable({
        name: 'order_menu_items',
        joinColumn: { name: 'order_id' },
        inverseJoinColumn: { name: 'item_id' }
    })
    items: MenuItem[];

    @Field(() => Client)
    @ManyToOne(type => Product, { eager: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    constructor(ordNumber: string, notes: string, items: MenuItem[],
                client: Client, orderStatus: OrderStatus = OrderStatus.CREATED) {
        super();
        this.ordNumber = ordNumber;
        this.notes = notes;
        this.items = items;
        this.client = client;
        this.orderStatus = orderStatus;
    }
}