import { Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { InsurancesResolver } from './insurances.resolver';

@Module({
  providers: [InsurancesResolver, InsurancesService],
})
export class InsurancesModule {}
