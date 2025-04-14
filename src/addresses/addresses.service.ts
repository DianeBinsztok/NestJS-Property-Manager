import { Injectable } from '@nestjs/common';
import { AddressDTO } from './address.dto';


@Injectable()
export class AddressesService {

    // Toutes les méthodes nécessiterons une authentification de l'utilisateur

    // I - READ
    // 1 - getAllAddressesByOwner(ownerId) - Toutes les adresses par propriétaire
    // - Appelée à la consultation du dashboard propriétaire, avec tous ses logement
    // - Accessible par le propriétaire uniquement
    // Avec paramètres optionnels : 
    // city?:string - recherche par ville
    // rented?:boolean - loué ou vacant

    // 2 - getAllAddressesForAdmin(adminId)
    // Avec paramètres optionnels : 
    // city?:string - recherche par ville
    // ownerId?:boolean - recherche par propriétaire
    // Accessible uniquement par l'admin, dans des cas précis

    // 3 - getAddressByLocation(locationId) - Adresse d'un logement 
    // - Appelée à la consultation des données du logement 
    // - Accessible par le propriétaire ET le locataire du logement

    // 4 - getOwnerPersonalAddress(ownerId) - Adresse d'un propriétaire
    // - Appelée à la consultation des données du propriétaire
    // - Accessible par le propriétaire uniquement : fait partie de ses données perso

    // II - CREATE
    // 1 - createPersonalAddress(ownerId) - Ajouter l'adresse d'un propriétaire
    // - Appelée lors de la création/modification du profil propriétaire
    // - Accessible par le propriétaire uniquement : fait partie de ses données perso

    // 2 - createLocationAddress(locationId) - Ajouter l'adresse d'un logement
    // - Appelée lors de la création/modification d'un logement à louer
    // - Accessible par le propriétaire du logement uniquement

    // III - UPDATE
    // 1 - updateAddress(addressId) - Modifier l'adresse d'un logement OU d'un profil propriétaire
    // - Appelée lors de la modification d'un logement à louer OU d'un profil propriétaire
    // - Accessible par le propriétaire uniquement 

    // IV - DELETE
    // 1 - deleteAddress(addressId) - Supprimer l'adresse d'un logement OU d'un profil propriétaire
    // - Appelée lors de la suppression d'un logement à louer OU d'un profil propriétaire
    // - Accessible par le propriétaire uniquement 
}