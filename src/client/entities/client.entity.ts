import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreditRiskProfileEnum } from '../../credits/risk-profile/types/risk-profile.type';

@Entity('dim_client')
@ObjectType()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  age: number;

  @Column({ enum: CreditRiskProfileEnum })
  @Field()
  riskProfile: CreditRiskProfileEnum;

  @Column({ default: 0 })
  @Field()
  borrowingCapacity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
