import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferEntity } from '../entities/offer.entity';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../../client/entities/client.entity';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { UpdateOfferDto } from '../dto/update-offer.dto';

@Injectable()
export class OfferRepository {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  public find = this.offerRepository.find.bind(this.offerRepository);

  public async saveOffer(
    offer: CreateOfferDto,
    client: ClientEntity,
  ): Promise<OfferEntity> {
    return this.offerRepository.save({ client, ...offer });
  }

  public async updateOffer(offer: UpdateOfferDto): Promise<OfferEntity> {
    return this.offerRepository.save(offer);
  }

  public getOfferByClient(clientId: number) {
    return this.offerRepository.find({
      where: {
        client: {
          id: clientId,
        },
      },
    });
  }
}
