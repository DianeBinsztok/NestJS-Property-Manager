import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { Hash } from 'crypto';

@Injectable()
export class UsersService {

    //Imposer un type à users. Ici : un tableau d'objets UserDTO
   private users : UserDTO[] =[
        {
            "id": 0,
            "name": "Jean",
            "surname": "Leclerc",
            "email": "jeanleclerc@gmail.com",
            "phoneNumber": "",
            "password": strHash("test"),
            "role": "admin",
        },{
            "id":1,
            "name":"Pierre",
            "surname":"Marchand",
            "email":"pierremarchand@yahoo.com",
            "phoneNumber": "",
            "password": strHash("test"),
            "role": "admin",
        },{
            "id":2,
            "name":"Isabelle",
            "surname":"Dubois",
            "email":"isadubois@hotmail.fr",
            "phoneNumber": "",
            "password": strHash("test"),
            "role": "admin",
        },{
            "id":3,
            "name":"Patrick",
            "surname":"Laforet",
            "email":"patlaforet@gmail.com",
            "phoneNumber": "",
            "password": strHash("test"),
            "role": "admin",
        },{
            "id":4,
            "name":"Sylvie",
            "surname":"François",
            "email":"sylfrancois@protonmail.com",
            "phoneNumber": "",
            "password": strHash("test"),
            "role": "admin",
        },{
            "id":5,
            "name":"Jeanne",
            "surname":"Le gros",
            "email":"jeannelegros@gmail.com",
            "phoneNumber": "",
            "password": strHash("test"),
            "role": "admin",
        }
    ];

    getAllUsers(role?:"tenant"|"owner"|"admin"):UserDTO[]|null{
        let users = this.users;
        if(users && users.length>0){
            if(role){
                let targetUsers = users.filter(user=>user.role == role);
                if(targetUsers){
                    return targetUsers;
                }else{
                    return null;
                }
                
            }else{
                return users;
            }
        }else{
            return null;
        }
    }

    getOneUser(id: number):UserDTO|null{
        let users = this.users;
        let targetUser = users.find((user)=>user.id==id);
        if(targetUser){
            return targetUser;
        }else{
            return null;
        }
    }

    createUser(newUserData:{name: string, surname:string, email:string, phoneNumber?:string, password: Hash, role:"owner"|"tenant"|"admin"}):UserDTO{
        // (L'id sera auto-incrémenté en BDD)
        let newUserId = this.users.length;
        // Affecter au nouvel utilisateur: son id et les données newUserData (objet détructuré) 
        let newUser = {id:newUserId, ...newUserData};
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id:number, updatedUser:{name?: string, surname?:string, email?:string, phoneNumber?:string, password?: Hash, role?:"owner"|"tenant"|"admin"}):UserDTO|null{
        let targetUser = this.getOneUser(id);
        if(targetUser){
           this.users[id]= {...targetUser, ...updatedUser, id: targetUser.id };
           return this.users[id];
        }else{
            return null;
        }
    }

    deleteUser(id:number):UserDTO[]|null{
        let targetUser = this.users.find(user=>user.id== id);
        if(targetUser){
            let targetUserIndex = this.users.indexOf(targetUser);
            this.users.splice(targetUserIndex, 1);
            return this.users;
        }else{
            return null;
        }
    }
}
function strHash(arg0: string): Hash {
    throw new Error('Function not implemented.');
}

