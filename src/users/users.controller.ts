import {Body, Controller, Get, Post, Param, Patch, Delete, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Afficher tous les utilisateurs : GET /users OU GET /users?role=unRoleDefini
    @Get()
    async getAllUsers(@Query('role')role?:"tenant"|"owner"|"admin"):Promise<UserDTO[]> {
      let users = await this.usersService.getAllUsers(role);
      if (!users) {
        throw new NotFoundException("Aucun utilisateur enregistré");
      }
      return users;
    }

    // Afficher un utilisateur par son id : GET /users/id
    @Get(":id")
    async getOneUser(@Param('id')id:string):Promise<UserDTO> {
      let user = await this.usersService.getOneUser(parseInt(id, 10));
      if (!user) {
        throw new NotFoundException("Aucun utilisateur enregistré");
      }
      return user;
    }
    
    // Ajouter un utilisateur : POST /users
    @Post()
    async createUser(@Body()NewUserData:{name: string, surname:string, email:string, phoneNumber?:string, password: string, role:"owner"|"tenant"|"admin"}): Promise<UserDTO|null>{
        return this.usersService.createUser(NewUserData);
    }

    // Modifier un utilisateur : PATCH /users/:id
    @Patch(":id")
    // Les propriétés de l'objet passé au Body sont optionnelles : on peut remplacer tout ou partie de l'utilisateur sélectionné
    async updateUser(@Param('id')id:string, @Body()updatedUserData:{name?: string, surname?:string, email?:string, phoneNumber?:string, password?: string, role?:"owner"|"tenant"|"admin"}): Promise<UserDTO|null> {
        let modifiedUser = this.usersService.updateUser(parseInt(id, 10), updatedUserData);
        if (!modifiedUser) {
          throw new NotFoundException(`Utilisateur n° ${id} introuvable - Il n'a pas pu être modifié`);
        }
        return modifiedUser;
    }

    // Supprimer un utilisateur : DELETE /users/:id
    @Delete(":id") 
    async deleteUser(@Param('id')id:string): Promise<UserDTO|null> {
      let newUsersList = this.usersService.deleteUser(parseInt(id, 10));
      if (!newUsersList) {
        throw new NotFoundException(`Utilisateur n° ${id} introuvable - Il ne peut pas être supprimé`);
      }
      return newUsersList; 
    }
}