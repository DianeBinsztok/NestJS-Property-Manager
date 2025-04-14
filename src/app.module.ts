import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Prisma
import { PrismaModule } from './prisma/prisma.module';
// Authentification utilisateurs
import { AuthModule } from './auth/auth.module';
// User
import { UsersModule } from './users/users.module';



@Module({
  imports: [UsersModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}