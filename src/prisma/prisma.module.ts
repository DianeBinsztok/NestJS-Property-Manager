import { Global, Module } from '@nestjs/common';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';

// Rend le module disponible en global - sur toute l'appli
@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService],
  controllers: [PrismaController]
})
export class PrismaModule {}
