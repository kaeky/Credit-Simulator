import { Injectable } from '@nestjs/common';
import { OfferRepository } from '../repositories/offer.repository';
import { ClientService } from '../../../client/services/client.service';

@Injectable()
export class OffersService {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly clientService: ClientService,
  ) {}
  getAllOffers() {
    this.offerRepository.find();
  }

  async getOfferByClientId(clientId: number) {
    const client = await this.clientService.getClientById(clientId);
    return this.offerRepository.getOfferByClient(client);
  }
}
