import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDashboard(): string {
    return '<h1>Mon dashboard</h1>';
  }
}
