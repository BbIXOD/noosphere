import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    const hash = argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
    
    return user;
  };

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user || !await argon.verify(user.password, dto.password)) {
      throw new ForbiddenException('Credentials do not match');
    }

    return user;
  };
}
