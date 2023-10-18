import { Card } from '@/interfaces/cards.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, Unique } from 'typeorm';

@Entity()
export class CardEntity extends BaseEntity implements Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique('cardNumber', ['userId', 'cardNumber'])
  cardNumber: string;

  @Column()
  @IsNotEmpty()
  cardHolderName: string;

  @Column()
  @IsNotEmpty()
  expirationDate: string;

  @Column()
  @IsNotEmpty()
  cvv: string;

  @Column()
  @IsNotEmpty()
  @Index()
  userId: number;

  @Column()
  @IsNotEmpty()
  @Unique('nickname', ['userId', 'nickname'])
  nickname: string;
}
