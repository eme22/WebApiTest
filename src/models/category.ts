import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, Double, JoinColumn, ManyToOne} from "typeorm";
import { Item } from "./item";


@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column( {nullable: true} )
    image!: string;
    
    @CreateDateColumn()
    createdAt!: Date;

 }