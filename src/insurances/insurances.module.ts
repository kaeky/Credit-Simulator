import { Module } from '@nestjs/common';
import { InsurancesService } from './services/insurances.service';
import { InsurancesResolver } from './resolvers/insurances.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceEntity } from './entities/insurance.entity';
import { InsuranceRepository } from './repositories/insurance.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InsuranceEntity])],
  providers: [InsurancesResolver, InsurancesService, InsuranceRepository],
})
export class InsurancesModule {}
