import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// plainToInstance transforme un objet en instance (s'il respecte le format de l'instance)
import { plainToInstance } from 'class-transformer';

// Les DTO
import { LocationSummaryDTO } from './DTO/location-summary.dto';

@Injectable()
export class LocationsService {

    constructor(private prisma:PrismaService){}

    // Tous les logements sans exception (accessible uniquement par un admin)
    async getAllLocations():Promise<LocationSummaryDTO[]>{
        try{
            const locations = await this.prisma.location.findMany({
                include:{address:true}
            });
            // Transformer chaque objet location en instance de LocationSummaryDTO
            return plainToInstance(LocationSummaryDTO, locations, {
                // Ignorer les propriétés non décorées avec @Expose()
                excludeExtraneousValues: true 
            })

        }catch(error){
            // Intercepter l'erreur
            console.error(`Erreur lors de la récupération des logements`, error);
            // Renvoyer une erreur nestjs pour le contrôleur
            throw new InternalServerErrorException('Impossible de récupérer les logements');
        }
    }
        

    // Tous les logements appartenant à un propriétaire donné
    async getAllLocationsByOwner(ownerId: number): Promise<LocationSummaryDTO[]> {

        try{
            let ownerships = await this.prisma.ownership.findMany({
                where: { ownerId },
                // Pour chaque Ownership, inclure la location
                  include: { 
                      // Pour chaque location, inclure l'adresse
                      location:{
                          include: { address: true }
                      } 
                  },
            });

            // Transformer les OwnershipDTO[] en LocationSummaryDTO[]

            // 1 - filtrage : ne garder que les Ownerships ayant une Location associée

            //La fonction type guard : ne renvoie true que si ownership.location n'est ni null ni undefined
            function hasLocation(
                ownership: typeof ownerships[number]
                ): ownership is typeof ownerships[number] & { location: Location } {
                return ownership.location !== undefined && ownership.location !== null;
                }              

           ownerships = ownerships.filter((hasLocation));
            // 2 - map : transformer les objets 
            // On peut appliquer plainToInstance à un tableau d'objets : il appliquera la transformation à chaque élément du tableau
           return plainToInstance(
            LocationSummaryDTO,
            // Le tableau mappé (chaque ownership est devenu un ownership.location)
            ownerships.map((ownership) => ownership.location),
            { excludeExtraneousValues: true }
          );
          // Ou on aussi peut mapper le tableau, en applicant plainToInstance à chaque tour de map 
          /*
          return ownerships.map((ownership)=>{
            return plainToInstance(
                LocationSummaryDTO,
                ownership,
                {excludeExtraneousValues:true}
            );
          })
        */
          
            
              
        }catch(error){
            // Intercepter l'erreur
            console.error(`Erreur lors de la récupération des logements du propriétaire ${ownerId}`, error);
            // Renvoyer une erreur nestjs pour le contrôleur
            throw new InternalServerErrorException('Impossible de récupérer les logements');
        }
    }
}
