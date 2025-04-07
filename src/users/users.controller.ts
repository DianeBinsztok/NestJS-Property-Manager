import {Body, Controller, Get, Post, Param, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Afficher tous les utilisateurs : GET /users OU GET /users?role=unRoleDefini
    @Get()
    getAllUsers(@Query('role')role?:"tenant"|"owner"|"admin"):string {
      return this.usersService.getAllUsers(role);
    }
    // Afficher un utilisateur par son id : GET /users/:id
    @Get(':id') // 
    getOneUser(@Param('id')id:string): string {
      return this.usersService.getOneUser(id);
    }
    // Ajouter un utilisateur : POST /users
    @Post()
    createUser(@Body()NewUserData:{name: string, surname:string, email:string, role:"owner"|"tenant"|"admin"}): {}{
        return this.usersService.createUser(NewUserData);
    }
    // Modifier un utilisateur : PATCH /users/:id
    @Patch(":id")
    // Les propriétés de l'objet passé au Body sont optionnelles : on peut remplacer tout ou partie de l'utilisateur sélectionné
    updateUser(@Param('id')id:string, @Body()updatedUserData:{name?: string, surname?:string, email?:string, role?:"owner"|"tenant"|"admin"}): {} {
        return this.usersService.updateUser(parseInt(id, 10), updatedUserData);
    }
    // Modifier un utilisateur : DELETE /users/:id
    @Delete(":id") 
    deleteUser(@Param('id')id:string): {} {
        return this.usersService.deleteUser(parseInt(id, 10));
    }
}
