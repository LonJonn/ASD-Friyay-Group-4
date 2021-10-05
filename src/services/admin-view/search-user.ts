
import { PrismaClient } from '@prisma/client';
import { db } from '@app/lib/db';

//Gets called from the API and attempts to add a new user to the database.
// A string value gets passed through to the function which gets split into the seperate name and email variables and passed to prisma.user.create function.
export async function searchUser(id1: string) {

  const searchUser = await db.user.findMany({
    where: {
      name: {contains: id1},
  },
});

  const returnedData = await searchUser;
  return returnedData
}
