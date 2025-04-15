import { AddressDTO } from 'src/addresses/address.dto';
import { UserDTO } from 'src/users/user.dto';

export class OwnerDTO extends UserDTO{

  address?:AddressDTO;

  // Classe à implémenter
  //locations:LocationDTO[];
}