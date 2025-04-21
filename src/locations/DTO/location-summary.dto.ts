import { Type, Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AddressDTO } from 'src/addresses/address.dto';

export class LocationSummaryDTO{

    @Expose()
    id:number;
    
    @Expose()
    @IsString()
    name:string="Nouvelle location";

    @Expose()
    @IsOptional()
    @IsEnum(["appartment", "house","parking","storage"])
    type?:"appartment"|"house"|"parking"|"storage";

    @Expose()
    @IsOptional()
    @IsNumber()
    rooms?:number;

    @Expose()
    @IsOptional()
    @Type(()=>AddressDTO)
    address?:AddressDTO;

    @Expose()
    @IsBoolean()
    rented:boolean = false;
}