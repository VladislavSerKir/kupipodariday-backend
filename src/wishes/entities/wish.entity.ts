import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsNotEmpty()
  @Length(2, 250)
  name: string;

  @Column()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @Min(1)
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Column()
  @Min(1)
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column()
  @IsPositive()
  copied: number;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
}
