import { IsNotEmpty, Length, MaxLength } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @Column()
  @MaxLength(1500)
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Wish, (wish) => wish.name)
  items: Wish[];
}
