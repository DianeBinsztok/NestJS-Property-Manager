import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsNumber } from 'class-validator';
import { LocationSummaryDTO } from 'src/locations/DTO/location-summary.dto';
import { TenantDTO } from 'src/tenants/tenant.dto';

// Relation many-to-many entre Tenant et Location
export class TenancyDTO {

    // Pas besoin de représenter la clé composite id: { tenantId: TenantDTO["id"], locationId: LocationDTO["id"] };
    // Celle-ci pourra être reconstituée dans le service
    @IsNumber()
    tenantId: number;
  
    @IsNumber()
    locationId: number;
  
    @IsDate()
    moveInDate: Date;
  
    @IsOptional()
    @IsDate()
    moveOutDate?: Date;
  
    @Type(() => TenantDTO)
    tenant?: TenantDTO;
  
    @Type(() => LocationSummaryDTO)
    location?: LocationSummaryDTO;
}