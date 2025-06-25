import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  signup(dto: AuthDto) {
    console.log(dto);
    return `signing up ${JSON.stringify(dto)}`
  };
  signin() { return 'signin' };
}
