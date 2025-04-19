import { Exclude, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AddressDTO } from 'src/addresses/address.dto';
import { OwnerDTO } from 'src/owners/owner.dto';
import { TenantDTO } from 'src/tenants/tenant.dto';

export class LocationDetailDTO{
    
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

    //Score DPE : Diagnostique de Performance Énergétique
    @IsOptional()
    @IsEnum(["A","B","C","D","E","F","G"])
    EPD?:"A"|"B"|"C"|"D"|"E"|"F"|"G";

    @IsOptional()
    @IsNumber()
    surface?:number;

    @IsBoolean()
    furnished:boolean = false;
    
    @IsBoolean()
    rented:boolean = false;

    @IsOptional()
    // Le décorateur @IsDecimal concerne les chaines de caractères : ici, la prop est un nombre et sera précisé comme un décimal dans le service, avec la classe Prisma Decimal
    @IsNumber()
    rent?:number;

    @Type(()=>OwnerDTO)
    owner:OwnerDTO;

    @IsOptional()
    @Type(()=>TenantDTO)
    tenant?:TenantDTO;

    // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
    @Exclude()
    @IsDate()
    createdAt: Date;

    // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
    @Exclude()
    @IsDate()
    updatedAt: Date;
}