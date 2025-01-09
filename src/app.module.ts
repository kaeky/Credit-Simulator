import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { CreditModule } from './credit/credit.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ClientModule, CreditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
