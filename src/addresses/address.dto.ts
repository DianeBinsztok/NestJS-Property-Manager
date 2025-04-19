import { Expose } from 'class-transformer';
import {Matches, IsString, IsDate } from 'class-validator';
export class AddressDTO {
    @Expose()
    id: number;

    // Pour inclure les formats "18", "18 bis", "18A", "16-18", etc.
    @Expose()
    @Matches(/^\d+[a-zA-Z\- ]*$/, { message: "Numéro de voie invalide" })
    streetNumber: string;

    // Type et libellé de voie (ex: Quai des Chartrons)
    @Expose()
    @IsString()
    streetTypeAndName: string;

    // Complément (ex: "bât B", "résidence des Lilas", étage, etc)
    @Expose()
    @IsString()
    additionalInfos: string;

    // Ville
    @Expose()
    @IsString()
    city: string;

    // Code postal
    @Expose()
    @IsString()
    zipCode: string;

    // Pays
    @Expose()
    @IsString()
    country: string;

    // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
    @Expose()
    @IsDate()
    createdAt: string;

    // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
    @Expose()
    @IsDate()
    updatedAt: string;
}