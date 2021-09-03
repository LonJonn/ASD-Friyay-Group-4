import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient();
  }

  prisma = (globalThis as any).prisma;
}

export { prisma as db };
