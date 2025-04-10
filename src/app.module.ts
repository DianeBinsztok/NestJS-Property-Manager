import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdressesController } from './adresses/adresses.controller';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [UsersModule, AddressesModule],
  controllers: [AppController, AdressesController],
  providers: [AppService],
})
export class AppModule {}
