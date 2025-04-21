import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {

    constructor(private prisma:PrismaService){}

    async getAllUsers(role?:"tenant"|"owner"|"admin"):Promise<UserDTO[]|[]>{
        try{
            if(role){
                let users = await this.prisma.user.findMany({
                    where:{role:{equals:role}}
                });
                return plainToInstance(
                    UserDTO,
                    users,
                    {excludeExtraneousValues:true}
                );
            }else{
                let users = await this.prisma.user.findMany();
                return plainToInstance(
                    UserDTO,
                    users,
                    {excludeExtraneousValues:true}
                );
            }
        }catch(error){
            console.error("Utilisateurs introuvables", error);
            return [];
        }
    }
        
    async getOneUser(id: number):Promise<UserDTO|null>{
        try{
            let user = await this.prisma.user.findUnique({where:{id}});
            return plainToInstance(
                UserDTO,
                user,
                {excludeExtraneousValues:true}
            );
        }catch(error){
            console.error(`L\'utilisateur n° ${id} est introuvable`, error);
            return null;
        }
    }

    async createUser(newUserData:{name: string, surname:string, email:string, phoneNumber?:string, password: string, role:"owner"|"tenant"|"admin"}):Promise<UserDTO|null>{
        try{
            let newUser = await this.prisma.user.create({data:newUserData});
            return plainToInstance(
                UserDTO,
                newUser,
                {excludeExtraneousValues:true}
            );

        }catch(error){
            console.error("L'utilisateur n'a pas pu être créé", error);
            throw new InternalServerErrorException("Impossible de créer l'utilisateur");
        }
    }

    async updateUser(id:number, updatedUserData:{name?: string, surname?:string, email?:string, phoneNumber?:string, password?: string, role?:"owner"|"tenant"|"admin"}):Promise<UserDTO|null>{
        try {

            let updatedUser = this.prisma.user.update({
                where: { id },
                data: {
                  ...updatedUserData,
                },
              });
              return plainToInstance(
                UserDTO,
                updatedUser,
                {excludeExtraneousValues:true}
            ); 
          } catch (error) {
            // Si l'utilisateur n'existe pas, lancer une exception
            console.error(`L\'utilisateur n° ${id} n'a pas été trouvé et ne peut pas être mis à jour`, error);
            throw new InternalServerErrorException("Impossible de créer l'utilisateur");
          }
    }

    async deleteUser(id:number):Promise<UserDTO|null>{
        try{
            return plainToInstance(
                UserDTO,
                this.prisma.user.delete({where:{id}}),
                {excludeExtraneousValues:true}
            ); 
        }catch(error){
            console.error(`L\'utilisateur n° ${id} n'a pas été trouvé et ne peut pas être supprimé`, error);
            return null;
        }
    }
}
