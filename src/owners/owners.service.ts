import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OwnershipDTO } from 'src/ownerships/ownership.dto';


@Injectable()
export class OwnersService {
    constructor(private prisma:PrismaService){}
}
