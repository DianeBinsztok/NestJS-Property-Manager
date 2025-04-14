import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    // Pas besoin d'importer PrismaModule, il est disponible globalement avec le décorateur @Global
})
export class UsersModule {}





