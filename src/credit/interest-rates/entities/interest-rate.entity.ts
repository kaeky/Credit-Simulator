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
  id: number;

  @Column()
  @Field()
  profile: CreditRiskProfileEnum;

  @Column()
  @Field()
  min_range: number;

  @Column()
  @Field()
  max_range: number;

  @Column()
  @Field()
  rate: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
