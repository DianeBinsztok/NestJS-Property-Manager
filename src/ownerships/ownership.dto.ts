import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { LocationDTO } from 'src/locations/location.dto';
import { OwnerDTO } from 'src/owners/owner.dto';

// Relation many-to-many entre Owner et Location
export class OwnershipDTO {

    // Pas besoin de représenter la clé composite id: { ownerId: TenantDTO["id"], locationId: LocationDTO["id"] };
    // Celle-ci pourra être reconstituée dans le service
    @IsNumber()
    ownerId: number;
  
    @IsNumber()
    locationId: number;
  
    @IsDate()
    acquiredAt: Date;
  
  
    @Type(() => OwnerDTO)
    owner?: OwnerDTO;
  
    @Type(() => LocationDTO)
    location?: LocationDTO;
}