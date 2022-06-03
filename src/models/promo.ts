import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, Double, JoinColumn, ManyToOne} from "typeorm";


@Entity()
export class Promo {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column( {nullable: true} )
    image!: string;

    @Column("decimal", { precision: 5, scale: 2 })
    discount!: number;

 }