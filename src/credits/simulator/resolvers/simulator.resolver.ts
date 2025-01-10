import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SimulatorService } from '../services/simulator.service';
import { CreateSimulationDto } from '../dto/create-simulation.dto';
import { SimulationCreditDto } from '../dto/simulation.dto';

@Resolver()
export class SimulatorResolver {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Mutation(() => SimulationCreditDto)
  generateSimulation(
    @Args('input') input: CreateSimulationDto,
  ): Promise<SimulationCreditDto> {
    return this.simulatorService.generateSimulation(input);
  }
}
