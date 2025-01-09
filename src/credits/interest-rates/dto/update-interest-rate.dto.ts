import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateInterestRateDto } from './create-interest-rate.dto';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateInterestRateDto extends PartialType(CreateInterestRateDto) {
  @Field()
  @IsNumber()
  public id: number;
}
