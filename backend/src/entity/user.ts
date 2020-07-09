import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;


    constructor(username: string, password: string, email: string, firstName: string,
                lastName: string) {
        this.id = 0
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export default User;