import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// plainToInstance transforme un objet en instance (s'il respecte le format de l'instance)
import { plainToInstance } from 'class-transformer';

// Les DTO
import { LocationSummaryDTO } from '../locations/location-summary.dto';
import { LocationDetailDTO } from './location-detail.dto';
import { OwnershipDTO } from 'src/ownerships/ownership.dto';

@Injectable()
export class LocationsService {

    constructor(private prisma:PrismaService){}

    // Tous les logements sans exception (accessible uniquement par un admin)
    async getAllLocations():Promise<LocationSummaryDTO[]>{
        try{
            const locations:LocationSummaryDTO[] = await this.prisma.location.findMany({
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
            const ownerships:OwnershipDTO[] = await this.prisma.ownership.findMany({
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
            return ownerships
            // Ne garder que les Ownerships ayant une Location associé
            .filter(ownership => ownership.location !== null)
            // Mapper chaque Ownership vers un LocationSummaryDTO
            .map(ownership => ({
                id: ownership.location.id,
                name: ownership.location.name,
                type: ownership.location.type,
                address: ownership.location.address,
                rented: ownership.location.rented,
            }));
        }catch(error){
            // Intercepter l'erreur
            console.error(`Erreur lors de la récupération des logements du propriétaire ${ownerId}`, error);
            // Renvoyer une erreur nestjs pour le contrôleur
            throw new InternalServerErrorException('Impossible de récupérer les logements');
        }
    }
}
