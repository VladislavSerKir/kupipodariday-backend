import { Wish } from "src/wishes/entities/wish.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    username: string;

    @Column()
    about: string;

    @Column()

    avatar: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Wish, (wish) => wish.name)
    wishes: Wish[];

    @OneToMany(() => Wish, (offer) => offer.name)
    offers: Wish[];

    @OneToMany(() => Wishlist, (wishlist) => wishlist.name)
    wishlists: Wishlist[];
}
