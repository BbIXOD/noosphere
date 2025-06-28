import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { User } from "generated/prisma";
import { JwtGuard } from "src/auth/guard";

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    if (!req.user) {
      return null
    }

    const { password, ...user } = req.user as User

    return user
  }
}
