import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const status = {
  connected: false,
};

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export async function getDB() {
  if (status.connected === false) {
    await prisma.$connect();
    status.connected = true;
  }

  return prisma;
}
