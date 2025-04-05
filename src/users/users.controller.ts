import {Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

/*
GET /users
GET /users/:id
POST /users
PATCH /users/:id
DELETE /users/:id
*/
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Tous les utilisateurs
    @Get() // GET /users OU GET /users?role=unRoleDefini
    getAllUsers(@Query('role')role?:string): string {
      return this.usersService.getAllUsers(role);
    }
    // Un utilisateur par son id
    @Get(':id') // GET /users/:id
    getOneUser(@Param('id')id:string): string {
      return this.usersService.getOneUser(id);
    }
}
