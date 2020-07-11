import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Parent } from './parent.entity';
import { MenuItem } from './menuItem.entity';
import { Client } from './client.entity';

@Entity("orders")
export class Order extends Parent {

    @Column()
    ordNumber: number;

    @Column()
    notes: string;

    @ManyToOne(type => MenuItem, menu => menu.order)
    @JoinColumn({ name: 'itemId' })
    items: MenuItem[];

    @OneToOne(type => Client)
    @JoinColumn()
    client: Client;

    constructor(ordNumber: number, notes: string, items: MenuItem[], client: Client) {
        super();
        this.ordNumber = ordNumber;
        this.notes = notes;
        this.items = items;
        this.client = client;
    }
}