import { InputType, PartialType } from '@nestjs/graphql';
import { CreateInterestRateDto } from './create-interest-rate.dto';

@InputType()
export class UpdateInterestRateDto extends PartialType(CreateInterestRateDto) {}
