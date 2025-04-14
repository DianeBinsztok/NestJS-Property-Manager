import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Authentification utilisateurs
import { AuthModule } from './auth/auth.module';
// User
import { UsersModule } from './users/users.module';


@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
