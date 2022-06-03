import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, Double, JoinColumn, ManyToOne} from "typeorm";
import { Category } from "./category";
import { Promo } from "./promo";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(_type => Category)
    category!: Category;

    @Column()
    categoryId!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column("decimal", { precision: 5, scale: 2 })
    price!: number;

    @ManyToOne(_type => Promo)
    promo!: Promo;

    @Column( {nullable: true} )
    promoId!: number;

    @Column( {nullable: true} )
    image!: string;
    
    @CreateDateColumn()
    createdAt!: Date;

}