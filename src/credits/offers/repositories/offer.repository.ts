import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferEntity } from '../entities/offer.entity';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../../client/entities/client.entity';

@Injectable()
export class OfferRepository {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  public find = this.offerRepository.find.bind(this.offerRepository);

  public save = this.offerRepository.save.bind(this.offerRepository);

  public getOfferByClient(client: ClientEntity) {
    return this.offerRepository.findOne({
      where: { client },
    });
  }
}
