import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    // @Column()
    // user: string;

    @OneToOne(() => User, (user) => user.id)
    user: User;

    // @Column()
    // item: string;

    @OneToOne(() => Wish, (wish) => wish.link)
    item: Wish;

    @Column()
    amount: number;

    @Column()
    hidden: boolean;
}
