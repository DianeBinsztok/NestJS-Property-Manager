import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AddressDTO } from 'src/addresses/address.dto';

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
}