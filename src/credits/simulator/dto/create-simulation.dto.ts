import { InputType, Field } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

@InputType()
export class CreateSimulationDto {
  @Field()
  amount: number;

  @Field()
  clientId: number;

  @IsIn([12, 24, 36, 48, 60], { message: 'Term must be 12, 24, 36, 48 or 60' })
  @Field()
  term: number;
}
