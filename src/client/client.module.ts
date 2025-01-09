import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { ClientResolver } from './resolvers/client.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { ClientRepository } from './repositories/client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientResolver, ClientService, ClientRepository],
})
export class ClientModule {}
