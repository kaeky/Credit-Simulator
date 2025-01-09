import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/client.repository';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientEntity } from '../entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}
  getClients(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  getClientById(id: number): Promise<ClientEntity> {
    return this.clientRepository.getClientById(id);
  }

  createClient(client: CreateClientDto): Promise<ClientEntity> {
    return this.clientRepository.save(client);
  }

  updateClient(client: UpdateClientDto): Promise<ClientEntity> {
    return this.clientRepository.save(client);
  }
}
