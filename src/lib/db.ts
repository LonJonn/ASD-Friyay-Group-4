import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
const status = {
  connected: false,
};

export async function getDB() {
  if (status.connected === false) {
    await prisma.$connect();
    status.connected = true;
  }

  return prisma;
}
