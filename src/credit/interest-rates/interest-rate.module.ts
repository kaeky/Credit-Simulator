import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestRateEntity } from './entities/interest-rate.entity';
import { InterestRateResolver } from './resolvers/interest-rate.resolver';
import { InterestRateService } from './services/interest-rate.service';
import { InterestRateRepository } from './repositories/interest-rate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InterestRateEntity])],
  providers: [
    InterestRateResolver,
    InterestRateService,
    InterestRateRepository,
  ],
})
export class InterestRateModule {}
