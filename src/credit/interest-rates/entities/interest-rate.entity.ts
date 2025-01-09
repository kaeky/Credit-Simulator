import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CreditRiskProfileEnum } from '../../risk-profile/types/risk-profile.type';

@Entity('dim_interest_rates')
@ObjectType()
export class InterestRateEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  riskProfile: CreditRiskProfileEnum;

  @Column()
  @Field()
  minRange: number;

  @Column({ type: 'bigint' })
  @Field()
  maxRange: number;

  @Column({ type: 'float' })
  @Field()
  rate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
