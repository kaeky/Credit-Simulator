import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from '../../../client/entities/client.entity';
import { CreditStatusEnum } from '../types/credit-status.type';

@ObjectType()
@Entity('dim_credit_offer')
export class OfferEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  amount: number;

  @ManyToOne(() => ClientEntity, (client) => client.id, { eager: true })
  @Field(() => ClientEntity)
  client: ClientEntity;

  @Column({ enum: CreditStatusEnum })
  @Field(() => CreditStatusEnum)
  status: CreditStatusEnum;

  @Column()
  @Field()
  term: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
