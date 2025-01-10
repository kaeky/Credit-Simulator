import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimulationEntity } from '../entities/simulation.entity';
import { ClientEntity } from '../../../client/entities/client.entity';

@Injectable()
export class SimulationRepository {
  constructor(
    @InjectRepository(SimulationEntity)
    private simulationRepository: Repository<SimulationEntity>,
  ) {}

  public find = this.simulationRepository.find.bind(this.simulationRepository);

  public save = this.simulationRepository.save.bind(this.simulationRepository);

  public findClientSimulations(client: ClientEntity) {
    return this.simulationRepository.findOne({
      where: { client: { id: client.id } },
    });
  }

  public removeClientSimulations(clientId: number) {
    return this.simulationRepository.delete({ client: { id: clientId } });
  }
}
