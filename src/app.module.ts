import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Prisma
import { PrismaModule } from './prisma/prisma.module';
// Authentification utilisateurs
import { AuthModule } from './auth/auth.module';
// User
import { UsersModule } from './users/users.module';
import { OwnersModule } from './owners/owners.module';
import { TenantsModule } from './tenants/tenants.module';
import { LocationsModule } from './locations/locations.module';



@Module({
  imports: [UsersModule, AuthModule, PrismaModule, OwnersModule, TenantsModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}