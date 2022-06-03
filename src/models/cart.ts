import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, Double, JoinColumn, ManyToOne, JoinTable, ManyToMany} from "typeorm";
import { CartItems } from "./cartItems";
import { Item } from "./item";
import { User } from "./user";


@Entity()
export class Cart {
  
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(_type => User)
    @JoinColumn()
    user!: User;

    @Column()
    userId!: number;

    @OneToMany(() => CartItems , cartItem => cartItem.cart)
    cartItems!: Array<CartItems>

    @Column({
        type: 'boolean',
        default: false
    })
    finished!: boolean;
    
    @CreateDateColumn()
    createdAt!: Date;

}