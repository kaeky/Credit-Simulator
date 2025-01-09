import { InputType } from '@nestjs/graphql';
import { CreditRiskProfileEnum } from '../../risk-profile/types/risk-profile.type';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateInterestRateDto {
  public riskProfile: CreditRiskProfileEnum;

  @IsNumber()
  public minRange: number;

  @IsNumber()
  public maxRange: number;

  @IsNumber()
  public interestRate: number;
}
