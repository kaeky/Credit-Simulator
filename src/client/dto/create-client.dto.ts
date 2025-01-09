import { InputType, Field } from '@nestjs/graphql';
import { CreditRiskProfileEnum } from '../../credits/risk-profile/types/risk-profile.type';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateClientDto {
  @IsString()
  @Field()
  public name: string;

  @IsString()
  @Field()
  public lastName: string;

  @IsNumber()
  @Field()
  public age: number;

  @Field(() => CreditRiskProfileEnum)
  public riskProfile: CreditRiskProfileEnum;
}
