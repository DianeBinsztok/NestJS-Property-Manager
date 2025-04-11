import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';


@Module({
  // Pas besoin de contrôleur: les adresses seront instanciées par d'autres classes mais pas accessibles directement
    providers: [AddressesService],
  })
export class AddressesModule {}
