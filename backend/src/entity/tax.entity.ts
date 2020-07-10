import { ParentEntity } from './parent.entity';
import { Column, Entity } from 'typeorm';

@Entity("taxes")
export class TaxEntity extends ParentEntity {

    @Column({ nullable: false })
    name: string;

    @Column()
    description: string;

    @Column({ nullable: false })
    tax: number;

    constructor(name: string, description: string, tax: number) {
        super();
        this.tax = tax;
        this.name = name;
        this.description = description;
    }
}