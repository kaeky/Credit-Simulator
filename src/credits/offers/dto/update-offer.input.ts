import { CreateOfferDto } from './create-offer.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOfferInput extends PartialType(CreateOfferDto) {
  @Field(() => Int)
  id: number;
}
