import { Injectable } from '@nestjs/common';
import { SimulationRepository } from '../repositories/simulation.repository';
import { OnEvent } from '@nestjs/event-emitter';
import { GENERATE_SIMULATION } from '../constants/simulator.constant';
import { ClientEntity } from '../../../client/entities/client.entity';
import { GENERATE_OFFER } from '../../offers/constants/offer.constant';
import { CreateOfferDto } from '../../offers/dto/create-offer.dto';

@Injectable()
export class SimulationLogService {
  constructor(private readonly simulationRepository: SimulationRepository) {}

  getSimulationLog() {
    return this.simulationRepository.find();
  }
  @OnEvent(GENERATE_SIMULATION)
  async saveLogSimulation(client: ClientEntity) {
    const existSimulation =
      await this.simulationRepository.findClientSimulations(client);

    if (existSimulation) {
      return null;
    }
    return this.simulationRepository.save({ client });
  }

  @OnEvent(GENERATE_OFFER)
  async removeSimulationLog(input: CreateOfferDto) {
    return this.simulationRepository.removeClientSimulations(input.clientId);
  }
}
