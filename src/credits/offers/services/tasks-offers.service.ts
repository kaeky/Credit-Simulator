import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SimulationLogService } from '../../simulator/services/simulation-log.service';
import { CalculateInterestRateService } from '../../interest-rates/services/calculate-interest-rate.service';
import { OptimalLoanCalculationService } from '../../simulator/services/optimal-loan-calculation.service';
import { InsurancesService } from '../../../insurances/services/insurances.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GENERATE_OFFER } from '../constants/offer.constant';
import { CreditStatusEnum } from '../types/credit-status.type';

@Injectable()
export class TasksOffersService {
  constructor(
    private readonly simulationLogService: SimulationLogService,
    private readonly calculateInterestRateService: CalculateInterestRateService,
    private readonly optimalLoanCalculationService: OptimalLoanCalculationService,
    private readonly insuranceService: InsurancesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async generateOffers() {
    const simulations = await this.simulationLogService.getSimulationLog();

    for (const simulation of simulations) {
      const { rate } =
        await this.calculateInterestRateService.basicInterestRate(
          simulation.client.riskProfile,
        );
      const { percentage } = await this.insuranceService.getInsuranceByAge(
        simulation.client.age,
      );
      const optimalLoanAmount =
        this.optimalLoanCalculationService.calculateOptimalLoanAmount(
          simulation.client.borrowingCapacity,
          rate,
          60,
          percentage,
        );
      const optimalTerm =
        this.optimalLoanCalculationService.calculateOptimalTerm(
          simulation.client.borrowingCapacity,
          optimalLoanAmount,
          rate,
        );
      this.eventEmitter.emit(GENERATE_OFFER, {
        amount: Math.round(optimalLoanAmount),
        clientId: simulation.client.id,
        status: CreditStatusEnum.ACTIVE,
        term: optimalTerm,
      });
    }
  }
}
