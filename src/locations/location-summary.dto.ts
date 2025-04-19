import { Exclude, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AddressDTO } from 'src/addresses/address.dto';
import { OwnerDTO } from 'src/owners/owner.dto';
import { TenantDTO } from 'src/tenants/tenant.dto';

export class LocationSummaryDTO{
    
    id:number;
    
    @IsString()
    name?:string;

    @IsOptional()
    @IsEnum(["appartment", "house","parking","storage"])
    type?:"appartment"|"house"|"parking"|"storage";

    @IsOptional()
    @IsNumber()
    rooms?:number;

    @IsOptional()
    @Type(()=>AddressDTO)
    address?:AddressDTO;
    
    @IsBoolean()
    rented:boolean = false;

    @Type(()=>OwnerDTO)
    owner:OwnerDTO;
}