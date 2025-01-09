import { Field, InputType } from '@nestjs/graphql';
import { CreditRiskProfileEnum } from '../../risk-profile/types/risk-profile.type';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateInterestRateDto {
  @Field(() => CreditRiskProfileEnum)
  public riskProfile: CreditRiskProfileEnum;

  @IsNumber()
  @Field()
  public minRange: number;

  @IsNumber()
  @Field()
  public maxRange: number;

  @IsNumber()
  @Field()
  public rate: number;
}
