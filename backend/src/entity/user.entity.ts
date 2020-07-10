import { Column, Entity } from 'typeorm';
import { ParentEntity } from './parent.entity';

@Entity("users")
export class UserEntity extends ParentEntity {

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, name: 'first_name' })
    firstName: string;

    @Column({ nullable: false, name: 'last_name' })
    lastName: string;

    @Column({ name: 'token' })
    token: string;


    constructor(
        username: string, password: string, firstName: string,
        lastName: string, email: string
    ) {
        super();
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = '';
    }
}

export default UserEntity;
