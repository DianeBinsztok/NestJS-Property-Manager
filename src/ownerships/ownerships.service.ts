import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnershipsService {
    constructor(private prisma:PrismaService){}
}
