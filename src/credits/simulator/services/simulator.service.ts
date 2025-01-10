import { Injectable } from '@nestjs/common';
import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { ClientService } from '../../../client/services/client.service';
import { CalculateInterestRateService } from '../../interest-rates/services/calculate-interest-rate.service';
import { InsurancesService } from '../../../insurances/services/insurances.service';
import { SimulationCreditDto } from '../dto/simulation.dto';
import { InterestCalculationService } from './interest-calculation.service';
import { InsuranceCalculationService } from './insurance-calculation.service';
import { PaymentScheduleGenerator } from './payment-schedule-generator.service';
import { ClientValidationService } from './client-validation.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GENERATE_SIMULATION } from '../constants/simulator.constant';

@Injectable()
export class SimulatorService {
  constructor(
    private readonly clientService: ClientService,
    private readonly calculateInterestRateService: CalculateInterestRateService,
    private readonly insuranceService: InsurancesService,
    private readonly interestCalculationService: InterestCalculationService,
    private readonly insuranceCalculationService: InsuranceCalculationService,
    private readonly paymentScheduleGenerator: PaymentScheduleGenerator,
    private readonly clientValidationService: ClientValidationService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async generateSimulation(
    input: CreateSimulationDto,
  ): Promise<SimulationCreditDto> {
    const client = await this.clientService.getClientById(input.clientId);
    const { riskProfile, borrowingCapacity, age } = client;
    this.eventEmitter.emit(GENERATE_SIMULATION, client);

    const { rate } =
      await this.calculateInterestRateService.calculateInterestRate(
        input.amount,
        riskProfile,
      );

    const { percentage } = await this.insuranceService.getInsuranceByAge(age);
    const monthlyRate = this.interestCalculationService.calculateMonthlyRate(
      rate,
      input.term,
    );

    const monthlyPayment =
      this.interestCalculationService.calculateMonthlyPayment(
        input.amount,
        monthlyRate,
        input.term,
      );

    const insuranceFee = this.insuranceCalculationService.calculateInsuranceFee(
      monthlyPayment,
      percentage,
    );

    const totalMonthlyPayment = monthlyPayment + insuranceFee;

    this.clientValidationService.validateBorrowingCapacity(
      totalMonthlyPayment,
      borrowingCapacity,
    );

    const months = this.paymentScheduleGenerator.generateSchedule(
      input.amount,
      input.term,
      monthlyPayment,
      monthlyRate,
      percentage,
    );

    let totalInterest = 0;
    let totalCapital = 0;
    let totalInsurance = 0;

    months.forEach((month) => {
      totalInterest += month.interest;
      totalCapital += month.capital;
      totalInsurance += month.insurance;
    });

    return {
      balance: parseFloat((totalMonthlyPayment * input.term).toFixed(2)),
      interest: parseFloat(totalInterest.toFixed(2)),
      capital: parseFloat(totalCapital.toFixed(2)),
      insurance: parseFloat(totalInsurance.toFixed(2)),
      months,
    };
  }
}
