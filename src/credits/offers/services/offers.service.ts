import { Injectable } from '@nestjs/common';
import { OfferRepository } from '../repositories/offer.repository';
import { ClientService } from '../../../client/services/client.service';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { GENERATE_OFFER } from '../constants/offer.constant';

@Injectable()
export class OffersService {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly clientService: ClientService,
  ) {}
  getAllOffers() {
    return this.offerRepository.find();
  }

  async getOfferByClientId(clientId: number) {
    return this.offerRepository.getOfferByClient(clientId);
  }

  @OnEvent(GENERATE_OFFER)
  async saveOffer(offer: CreateOfferDto) {
    const client = await this.clientService.getClientById(offer.clientId);
    return this.offerRepository.saveOffer(offer, client);
  }
}
