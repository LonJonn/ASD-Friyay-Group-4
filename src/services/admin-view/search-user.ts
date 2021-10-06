import { PrismaClient } from '@prisma/client';
import { db } from '@app/lib/db';

//Gets called from the API and returns search results
//Finds all values that contain string in name
export async function searchUser(id1: string) {

  const searchUser = await db.user.findMany({
    where: {
      name: {contains: id1},
  },
});

  const returnedData = await searchUser;
  return returnedData
}
