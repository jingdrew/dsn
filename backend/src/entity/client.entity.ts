import { Column, Entity, Index } from 'typeorm';
import { ParentEntity } from './parent.entity';

@Entity("clients")
export class ClientEntity extends ParentEntity {

    @Column({ nullable: false })
    fullName: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column({ unique: true, nullable: false })
    @Index()
    phoneNumber: string;

    constructor(fullName: string, address: string, email: string, phoneNumber: string) {
        super();
        this.fullName = fullName;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }


}