import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { CreditModule } from './credits/credit.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InterestRateModule } from './credits/interest-rates/interest-rate.module';
import { InsurancesModule } from './insurances/insurances.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
    }),
    ClientModule,
    CreditModule,
    InterestRateModule,
    InsurancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
