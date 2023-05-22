import { Wish } from "src/wishes/entities/wish.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @OneToMany(() => Wish, (wish) => wish.name)
    items: Wish[];
}
