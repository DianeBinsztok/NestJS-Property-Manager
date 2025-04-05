import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getAllUsers():string{
        return "<h1>Tous les utilisateurs</h1>";
    };
    getOneUser(id: string):string{
        return "<h1>Utilisateur n° "+id+"</h1>";
    }
}
