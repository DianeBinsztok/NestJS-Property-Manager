import { Injectable } from '@nestjs/common';
import { isSet } from 'util/types';

@Injectable()
export class UsersService {

   private users =[
        
        {
            "id":0,
            "name":"Jean",
            "surname":"Leclerc",
            "email":"jeanleclerc@gmail.com",
            "role":"admin"
        },{
            "id":1,
            "name":"Pierre",
            "surname":"Marchand",
            "email":"pierremarchand@yahoo.com",
            "role":"owner"
        },{
            "id":2,
            "name":"Isabelle",
            "surname":"Dubois",
            "email":"isadubois@hotmail.fr",
            "role":"tenant"
        },{
            "id":3,
            "name":"Patrick",
            "surname":"Laforet",
            "email":"patlaforet@gmail.com",
            "role":"owner"
        },{
            "id":4,
            "name":"Sylvie",
            "surname":"François",
            "email":"sylfrancois@protonmail.com",
            "role":"owner"
        },{
            "id":5,
            "name":"Jeanne",
            "surname":"Le gros",
            "email":"jeannelegros@gmail.com",
            "role":"tenant"
        }
    ];

    getAllUsers():string{
        let resultString ="";
        let users = this.users;
        if(isSet(users)&&users.length>0){
            resultString = "<h1>Tous les utilisateurs :</h1><ul>"
            // Ne fonctionne pas si on donne l'objet user en param sans le décomposer, car les propriétés user.name, user.role etc. n'existent pas
            users.forEach(({name, surname, email, role})=>{
                resultString+=`<li><h2>${name} ${surname}</h2><p>${email}</p><p>${role}</p></li>`
            })
        }else{
            resultString = "<h1>Aucun utilisateur enregistré</h1>"
        }

        resultString += "</ul>"
        return resultString;
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
