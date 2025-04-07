import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    //Imposer un type à users. Ici : tableau d'objets aux propriétés spécifiques
   private users : { id: number; name: string; surname: string; email: string; role: "admin" | "owner" | "tenant"; }[] =[
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

    getAllUsers(role?:"tenant"|"owner"|"admin"):{}[]|null{
        let users = this.users;
        if(users && users.length>0){
            if(role){
                let targetUsers = users.filter(user=>user.role == role);
                return targetUsers;
            }else{
                return users;
            }
        }else{
            return null;
        }
    }

    getOneUser(id: number):{id:number,name: string, surname:string, email:string, role:"owner"|"tenant"|"admin"}|null{
        let users = this.users;
        let targetUser = users.find((user)=>user.id==id);
        if(targetUser){
            return targetUser;
        }else{
            return null;
        }
    }

    createUser(newUserData:{name: string, surname:string, email:string, role:"owner"|"tenant"|"admin"}):{}{
        // (L'id sera auto-incrémenté en BDD)
        let newUserId = this.users.length;
        // Affecter au nouvel utilisateur: son id et les données newUserData (objet détructuré) 
        let newUser = {id:newUserId, ...newUserData};
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id:number, updatedUser:{name?: string, surname?:string, email?:string, role?:"owner"|"tenant"|"admin"}):{}|null{
        let targetUser = this.getOneUser(id);
        if(targetUser){
           this.users[id]= {...targetUser, ...updatedUser, id: targetUser.id };
           return this.users[id];
        }else{
            return null;
        }
    }
    deleteUser(id:number):{}[]|null{
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
