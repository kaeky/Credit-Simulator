import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OffersService } from '../services/offers.service';
import { OfferEntity } from '../entities/offer.entity';
import { CreateOfferDto } from '../dto/create-offer.dto';

@Resolver(() => OfferEntity)
export class OffersResolver {
  constructor(private readonly offersService: OffersService) {}

  @Query(() => [OfferEntity])
  getAllOffers() {
    return this.offersService.getAllOffers();
  }

  @Query(() => [OfferEntity])
  getOfferByClient(@Args('id') id: number) {
    return this.offersService.getOfferByClientId(id);
  }

  @Mutation(() => OfferEntity)
  saveOffer(@Args('input') input: CreateOfferDto) {
    return this.offersService.saveOffer(input);
  }
}
