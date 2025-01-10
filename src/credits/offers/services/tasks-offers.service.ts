import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SimulationLogService } from '../../simulator/services/simulation-log.service';

@Injectable()
export class TasksOffersService {
  constructor(private readonly simulationLogService: SimulationLogService) {}

  @Cron(CronExpression.EVERY_SECOND)
  async generateOffers() {
    const { client } = await this.simulationLogService.getSimulationLog();

    console.log('Generating offers for simulations:', client);
    // this.simulationLogService.createSimulationLog();
  }
}
