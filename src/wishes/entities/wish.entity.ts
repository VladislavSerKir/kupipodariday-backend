import { Offer } from "src/offers/entities/offer.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    name: string;

    @Column()
    link: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column()
    raised: number;

    @Column()
    owner: string;

    @Column()
    description: string;

    @OneToMany(() => Offer, (offer) => offer.user)
    offers: Offer[];
}
