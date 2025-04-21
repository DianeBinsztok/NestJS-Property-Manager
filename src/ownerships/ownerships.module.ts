import { Module } from '@nestjs/common';
import { OwnershipsService } from './ownerships.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OwnershipsService, PrismaService]
})
export class OwnershipsModule {}
