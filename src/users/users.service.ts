import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getAllUsers(role?:string):string{
        console.log(role);
        if(role){
            return "<h1>Tous les utilisateurs avec le role "+role+"</h1>";
        }else{
            return "<h1>Tous les utilisateurs</h1>";
        }
    };
    getOneUser(id: string):string{
        return "<h1>Utilisateur n° "+id+"</h1>";
    }
}
