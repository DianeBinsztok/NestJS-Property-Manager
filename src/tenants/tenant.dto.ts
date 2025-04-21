import { AddressDTO } from 'src/addresses/address.dto';
import { LocationSummaryDTO } from 'src/locations/DTO/location-summary.dto';
import { UserDTO } from 'src/users/user.dto';

export class TenantDTO extends UserDTO{

  address?:AddressDTO;

  locations:LocationSummaryDTO[];
}