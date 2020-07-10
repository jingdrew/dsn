import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ParentEntity } from './parent.entity';
import { MenuItemEntity } from './menuItem.entity';
import { ClientEntity } from './client.entity';

@Entity("orders")
export class OrderEntity extends ParentEntity {

    @Column()
    ordNumber: number;

    @Column()
    notes: string;

    @ManyToOne(type => MenuItemEntity, menu => menu.order)
    @JoinColumn({ name: 'itemId' })
    items: MenuItemEntity[];

    @OneToOne(type => ClientEntity)
    @JoinColumn()
    client: ClientEntity;

    constructor(ordNumber: number, notes: string, items: MenuItemEntity[], client: ClientEntity) {
        super();
        this.ordNumber = ordNumber;
        this.notes = notes;
        this.items = items;
        this.client = client;
    }

}