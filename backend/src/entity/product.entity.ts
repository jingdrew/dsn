import { ParentEntity } from './parent.entity';
import { Column, Entity } from 'typeorm';

@Entity("products")
export class ProductEntity extends ParentEntity{

    @Column()
    name: string;

    @Column()
    description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }
}