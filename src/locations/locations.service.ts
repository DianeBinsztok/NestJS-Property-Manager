import { Injectable } from '@nestjs/common';
import { OwnershipDTO } from 'src/ownerships/ownership.dto';
import { PrismaService } from 'src/prisma/prisma.service';

// Les DTO
import { LocationDetailDTO } from '../locations/location-detail.dto';
import { LocationSummaryDTO } from '../locations/location-summary.dto';

@Injectable()
export class LocationsService {

    constructor(private prisma:PrismaService){}

    async getAllLocationsBelongingToOwner(ownerId:number):Promise<{}[]|[]>{

        let locations:{}[] = [];
         try{
             // 1 - Dans la table de liaison ownerships : trouver toutes les relations qui concerne l'id du propriétaire
             const ownerships:OwnershipDTO[] = await this.prisma.ownership.findMany({
                 where:{ownerId},
                 // 2 - Pour chaque relation trouvée : inclure les données du logement
                 include:{location:true}
             });
             // 3 - Si le propriétaire est bien lié à un logement dans cette ligne de la table
             ownerships.forEach((ownership)=> {
                 if (ownership.location) {
                     locations.push({
                       id: ownership.location.id,
                       name:ownership.location.name,
                       type:ownership.location.type,
                       rooms:ownership.location.rooms,
                       EPD:ownership.location.EPD,
                       surface:ownership.location.surface,
                       furnished:ownership.location.furnished,
                       rented:ownership.location.rented,
                       rent:ownership.location.rent,
                       acquiredAt: ownership.acquiredAt,
                       createdAt:ownership.location.createdAt,
                       updatedAt:ownership.location.updatedAt,
                     });
                 }
             })
         }catch(error){
             console.error("Aucun logement enregistré", error); 
         }
         return locations;
     }
}
