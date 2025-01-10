import { Module } from '@nestjs/common';
import { SimulatorService } from './services/simulator.service';
import { SimulatorResolver } from './resolvers/simulator.resolver';
import { InterestRateModule } from '../interest-rates/interest-rate.module';
import { ClientModule } from '../../client/client.module';
import { InsurancesModule } from '../../insurances/insurances.module';
import { InsuranceCalculationService } from './services/insurance-calculation.service';
import { InterestCalculationService } from './services/interest-calculation.service';
import { PaymentScheduleGenerator } from './services/payment-schedule-generator.service';
import { ClientValidationService } from './services/client-validation.service';
import { SimulationLogService } from './services/simulation-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationEntity } from './entities/simulation.entity';
import { SimulationRepository } from './repositories/simulation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SimulationEntity]),
    InterestRateModule,
    ClientModule,
    InsurancesModule,
  ],
  providers: [
    SimulatorResolver,
    SimulatorService,
    InsuranceCalculationService,
    InterestCalculationService,
    PaymentScheduleGenerator,
    ClientValidationService,
    SimulationLogService,
    SimulationRepository,
  ],
  exports: [SimulationLogService],
})
export class SimulatorModule {}
