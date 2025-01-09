import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { OffersService } from '../services/offers.service';
import { OfferEntity } from '../entities/offer.entity';

@Resolver(() => OfferEntity)
export class OffersResolver {
  constructor(private readonly offersService: OffersService) {}

  @Query(() => [OfferEntity])
  getAllOffers() {
    return this.offersService.getAllOffers();
  }

  @Query(() => OfferEntity, { name: 'offer' })
  getOfferByClient(@Args('id', { type: () => Int }) id: number) {
    return this.offersService.getOfferByClientId(id);
  }
}
