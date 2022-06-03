import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, Double, JoinColumn, ManyToOne} from "typeorm";
import { Cart } from "./cart";
import { Item } from "./item";

@Entity()
export class CartItems {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(_type => Cart)
    cart!: Cart;

    @Column()
    cartId!: number;

    @ManyToOne(_type => Item)
    item!: Item;

    @Column()
    itemId!: number;

    @Column()
    count!: number;

}