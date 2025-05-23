import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService, PrismaService]
})
export class OwnersModule {}
