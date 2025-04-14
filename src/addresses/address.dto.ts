import {Matches, IsString } from 'class-validator';
export class AddressDTO {
    
    id: number;

    // Numéro de voie
    @IsString()

    // Pour inclure les formats "18", "18 bis", "18A", "16-18", etc.
    @Matches(/^\d+[a-zA-Z\- ]*$/, { message: "Numéro de voie invalide" })
    streetNumber: string;

    // Type et libellé de voie (ex: Quai des Chartrons)
    @IsString()
    streetTypeAndName: string;

    // Complément (ex: "bât B", "résidence des Lilas", étage, etc)
    @IsString()
    additionalInfos: string;

    // Ville
    @IsString()
    city: string;

    // Code postal
    @IsString()
    zipCode: string;

    // Pays
    @IsString()
    country: string;
}