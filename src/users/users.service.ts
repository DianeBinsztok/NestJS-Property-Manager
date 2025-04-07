import { Injectable } from '@nestjs/common';

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

    getAllUsers(role?:"tenant"|"owner"|"admin"):string{
        let resultString ="";
        let users = this.users;
        if(users&&users.length>0){
            if(role){
                if(role === "tenant"|| role ==="owner"|| role ==="admin"){
                    resultString = `<h1>Tous les utilisateurs ${role}:</h1><ul>`;
                    let targetUsers = users.filter(user=>user.role === role);
                    targetUsers.forEach(({name, surname, email, role})=>{
                        resultString+=`<li><h2>${name} ${surname}</h2><p>${email}</p><p>${role}</p></li>`
                    })
                }else{
                    resultString = `<h1>Le role "${role}" n'existe pas</h1>`;
                }

            }else{
                resultString = "<h1>Tous les utilisateurs :</h1><ul>"
                users.forEach(({name, surname, email, role})=>{
                    resultString+=`<li><h2>${name} ${surname}</h2><p>${email}</p><p>${role}</p></li>`
                })
            }

        }else{
            resultString = "<h1>Aucun utilisateur enregistré</h1>";
        }
        resultString += "</ul>"
        return resultString;
    };

    getOneUser(id: string):string{
        let resultString ="";
        let users = this.users;
        let targetUser = users.find((user)=>user.id==parseInt(id, 10));
        if(targetUser){
            resultString +=`<h1>Utilisateur n° ${targetUser.id} :</h1><p>${targetUser.name} ${targetUser.surname}</p><p>${targetUser.email}</p><p>${targetUser.role}</p>`;
        }else{
            resultString += "<h1>Aucun utilisateur ne correspond à cet identifiant</h1>"
        }
        return resultString;
    }

    createUser(newUserData:{name: string, surname:string, email:string, role:"owner"|"tenant"|"admin"}):{}{
        // (L'id sera auto-incrémenté en BDD)
        let newUserId = this.users.length;
        // Affecter au nouvel utilisateur: son id et les données newUserData (objet détructuré) 
        let newUser = {id:newUserId, ...newUserData};
        this.users.push(newUser);
        return newUser;
    }
    updateUser(id:string, updatedUser:{}){
        return updatedUser;
    }
    deleteUser(id:string){
        return "<h1>Utilisateur n°"+id+" supprimé</h1>"
    }
}
