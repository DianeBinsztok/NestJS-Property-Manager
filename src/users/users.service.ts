import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getAllUsers():string{
        return "<h1>Tous les utilisateurs</h1>";
    };
    getOneUser(id: string):string{
        return "<h1>Utilisateur n° "+id+"</h1>";
    }
    createUser(newUser:{}):{}{
        return newUser;
    }
    updateUser(id:string, updatedUser:{}){
        return updatedUser;
    }
    deleteUser(id:string){
        return "<h1>Utilisateur n°"+id+" supprimé</h1>"
    }
}
