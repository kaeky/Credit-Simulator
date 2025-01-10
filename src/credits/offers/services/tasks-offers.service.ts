import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SimulationLogService } from '../../simulator/services/simulation-log.service';
import { CalculateInterestRateService } from '../../interest-rates/services/calculate-interest-rate.service';
import { OptimalLoanCalculationService } from '../../simulator/services/optimal-loan-calculation.service';
import { InsurancesService } from '../../../insurances/services/insurances.service';

@Injectable()
export class TasksOffersService {
  constructor(
    private readonly simulationLogService: SimulationLogService,
    private readonly calculateInterestRateService: CalculateInterestRateService,
    private readonly optimalLoanCalculationService: OptimalLoanCalculationService,
    private readonly insuranceService: InsurancesService,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async generateOffers() {
    const simulations = await this.simulationLogService.getSimulationLog();

    simulations.forEach(async (simulation) => {
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
    });

    // this.simulationLogService.createSimulationLog();
  }
}
