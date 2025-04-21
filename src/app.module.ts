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
import { OwnershipsModule } from './ownerships/ownerships.module';
import { TenanciesModule } from './tenancies/tenancies.module';
import { PrismaService } from './prisma/prisma.service';



@Module({
  imports: [UsersModule, AuthModule, PrismaModule, OwnersModule, TenantsModule, LocationsModule, OwnershipsModule, TenanciesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}