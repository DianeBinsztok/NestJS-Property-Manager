import { Module } from '@nestjs/common';
import { OwnershipsService } from './ownerships.service';

@Module({
  providers: [OwnershipsService]
})
export class OwnershipsModule {}
