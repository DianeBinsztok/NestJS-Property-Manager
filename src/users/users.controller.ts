import {Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Afficher tous les utilisateurs : GET /users OU GET /users?role=unRoleDefini
    @Get()
    getAllUsers(): string {
      return this.usersService.getAllUsers();
    }
    // Afficher un utilisateur par son id : GET /users/:id
    @Get(':id') // 
    getOneUser(@Param('id')id:string): string {
      return this.usersService.getOneUser(id);
    }
    // Ajouter un utilisateur : POST /users
    @Post()
    // Renvoie un objet : {}
    createUser(@Body()NewUserData:{}): {}{
        return this.usersService.createUser(NewUserData);
    }
    // Modifier un utilisateur : PATCH /users/:id
    @Patch(":id")
        // Renvoie un objet : {}
    updateUser(@Param('id')id:string, @Body()updatedUserData:{}): {} {
        return this.usersService.updateUser(id, updatedUserData);
    }
    // Modifier un utilisateur : DELETE /users/:id
    @Delete(":id") 
    deleteUser(@Param('id')id:string): {} {
        return this.usersService.deleteUser(id);
    }
}
