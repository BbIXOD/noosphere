import { Catch, ForbiddenException } from "@nestjs/common";
import { Prisma } from "generated/prisma";

@Catch(Prisma.PrismaClientKnownRequestError)
export class DuplicateUniqueExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    if (exception.code === "P2002") {
      throw new ForbiddenException("Unique constraint failed");
    }
  }
}
