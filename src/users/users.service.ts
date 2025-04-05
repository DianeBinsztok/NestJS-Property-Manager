import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getAllUsers(role?:string, city?:string):string{
        
        if(role || city){
            let resultString = "<h1>Les utilisateurs :</h1>";
        if(role){
            resultString += "<p>Avec le rôle: "+role+"</p>";
        }
        if(city){
            resultString += "<p>De la ville: "+city+"</p>";
        }
            return resultString;
        }else{
            return "<h1>Tous les utilisateurs</h1>";
        }
    };
    getOneUser(id: string):string{
        return "<h1>Utilisateur n° "+id+"</h1>";
    }
}
