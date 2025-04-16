import { AddressDTO } from 'src/addresses/address.dto';
import { LocationDTO } from 'src/locations/location.dto';
import { UserDTO } from 'src/users/user.dto';

export class OwnerDTO extends UserDTO{

  address?:AddressDTO;

  locations:LocationDTO[];
}