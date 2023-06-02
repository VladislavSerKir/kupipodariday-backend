import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  @OneToOne(() => Wish, (wish) => wish.link)
  item: Wish;

  @Column()
  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
