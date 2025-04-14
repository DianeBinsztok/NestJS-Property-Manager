import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

    constructor(private prisma:PrismaService){}

    async getAllUsers(role?:"tenant"|"owner"|"admin"):Promise<UserDTO[]|[]>{
        try{
            if(role){
                return await this.prisma.user.findMany({
                    where:{role:{equals:role}}
                });
            }else{
                return await this.prisma.user.findMany();
            }
        }catch(error){
            console.error("Utilisateurs introuvables", error);
            return [];
        }
    }
        
    async getOneUser(id: number):Promise<UserDTO|null>{
        try{
            return await this.prisma.user.findUnique({where:{id}});
        }catch(error){
            console.error(`L\'utilisateur n° ${id} est introuvable`, error);
            return null;
        }
        
    }

    async createUser(newUserData:{name: string, surname:string, email:string, phoneNumber?:string, password: string, role:"owner"|"tenant"|"admin"}):Promise<UserDTO|null>{
        try{
            return await this.prisma.user.create({data:newUserData});
        }catch(error){
            console.error("L'utilisateur n'a pas pu être créé", error);
            return null;
        }
    }

    async updateUser(id:number, updatedUser:{name?: string, surname?:string, email?:string, phoneNumber?:string, password?: string, role?:"owner"|"tenant"|"admin"}):Promise<UserDTO|null>{
        try {
            return await this.prisma.user.update({
              where: { id },
              data: {
                ...updatedUser,
              },
            });
          } catch (error) {
            // Si l'utilisateur n'existe pas, lancer une exception
            console.error(`L\'utilisateur n° ${id} n'a pas été trouvé et ne peut pas être mis à jour`, error);
            return null;
          }
    }

    async deleteUser(id:number):Promise<UserDTO|null>{
        try{
            return await this.prisma.user.delete({where:{id}});
        }catch(error){
            console.error(`L\'utilisateur n° ${id} n'a pas été trouvé et ne peut pas être supprimé`, error);
            return null;
        }
    }
}

