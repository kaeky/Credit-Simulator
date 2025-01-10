import { Module } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersResolver } from './resolvers/offers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from './entities/offer.entity';
import { ClientModule } from '../../client/client.module';
import { OfferRepository } from './repositories/offer.repository';
import { TasksOffersService } from './services/tasks-offers.service';
import { SimulatorModule } from '../simulator/simulator.module';
import { InterestRateModule } from '../interest-rates/interest-rate.module';
import { InsurancesModule } from '../../insurances/insurances.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfferEntity]),
    ClientModule,
    SimulatorModule,
    InterestRateModule,
    InsurancesModule,
  ],
  providers: [
    OffersResolver,
    OffersService,
    OfferRepository,
    TasksOffersService,
  ],
})
export class OffersModule {}
