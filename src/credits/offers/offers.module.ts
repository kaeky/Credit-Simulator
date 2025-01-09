import { Module } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersResolver } from './resolvers/offers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from './entities/offer.entity';
import { ClientModule } from '../../client/client.module';
import { OfferRepository } from './repositories/offer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity]), ClientModule],
  providers: [OffersResolver, OffersService, OfferRepository],
})
export class OffersModule {}
