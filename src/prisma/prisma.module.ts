import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Rend le module disponible en global - sur toute l'appli
@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
