import { InputType, Field } from '@nestjs/graphql';
import { IsIn, IsNumber } from 'class-validator';
import { CreditStatusEnum } from '../types/credit-status.type';

@InputType()
export class CreateOfferDto {
  @IsNumber()
  @Field()
  public amount: number;

  @Field()
  @IsNumber()
  public clientId: number;

  @Field(() => CreditStatusEnum)
  public status: CreditStatusEnum;

  @Field()
  @IsNumber()
  @IsIn([12, 24, 36, 48, 60], { message: 'Term must be 12, 24, 36, 48 or 60' })
  public term: number;
}
