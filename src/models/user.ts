import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    passwordHash!: string;

    @Column()
    address!: string;

    @Column()
    phone!: number;

    @Column({
        type: 'boolean',
        default: false
    })
    admin!: boolean;

    @Column( {nullable: true} )
    image!: string;
    
    @CreateDateColumn()
    createdAt!: Date;

}