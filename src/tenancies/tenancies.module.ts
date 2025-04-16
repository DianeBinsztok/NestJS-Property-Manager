import { Module } from '@nestjs/common';
import { TenanciesService } from './tenancies.service';

@Module({
  providers: [TenanciesService]
})
export class TenanciesModule {}
