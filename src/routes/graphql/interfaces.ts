import { PrismaClient } from "@prisma/client";

export interface IContext {
  prisma: PrismaClient
}

export interface ISource {
  [key: string]: unknown;
}