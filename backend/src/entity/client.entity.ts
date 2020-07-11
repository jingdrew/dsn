import { Column, Entity, Index } from 'typeorm';
import { Parent } from './parent.entity';

@Entity("clients")
export class Client extends Parent {

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