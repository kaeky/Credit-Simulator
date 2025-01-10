import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from '../../../client/entities/client.entity';

@ObjectType()
@Entity('mvd_simulation')
export class SimulationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity, (client) => client.id, { eager: true })
  @Field(() => ClientEntity)
  client: ClientEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
