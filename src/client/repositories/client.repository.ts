import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  public find = this.clientRepository.find.bind(this.clientRepository);

  public save = this.clientRepository.save.bind(this.clientRepository);

  public getClientById(id: number) {
    return this.clientRepository.findOne({ where: { id } });
  }
}
