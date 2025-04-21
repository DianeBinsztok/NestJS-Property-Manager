import { Controller, Get, NotFoundException } from '@nestjs/common';
import { LocationSummaryDTO } from './DTO/location-summary.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    // Afficher tous les logements GET /locations 
    // Filtrer par ville
    // Filtrer par 'rented' : si le logement est loué ou non
    @Get()
    async getAllLocations():Promise<LocationSummaryDTO[]> {
        let locations = await this.locationsService.getAllLocations();
        if (!locations) {
          throw new NotFoundException("Aucun logement enregistré");
        }
        return locations;
    }

    // Afficher tous les logements appartenant à un propriétaire GET locations/:ownerId/
    // Filtrer par ville
    // Filtrer par 'rented' : si le logement est loué ou non
    @Get(":ownerId")
    async getAllLocationsByOwner(ownerId):Promise<LocationSummaryDTO[]> {
        let locations = await this.locationsService.getAllLocationsByOwner(ownerId);
        if (!locations) {
          throw new NotFoundException(`Aucun logement enregistré pour l'utilisateur n°${ownerId}`);
        }
        return locations;
    }

    // Afficher le détail d'un logement, version admin : avec le propriétaire GET /locations/:locationId

    // Afficher le détail d'un logement, version propriétaire : pas besoin de mentionner le propriétaire GET locations/user/:userId/:locationId

    // Créer un nouveau logement POST locations/user/:userId/

    // Modifier un logement PATCH locations/user/:userId/:locationId

    // Supprimer un logement DELETE locations/user/:userId/:locationId
}
