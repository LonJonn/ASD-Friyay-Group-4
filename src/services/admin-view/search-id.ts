import { PrismaClient } from '@prisma/client';
import { db } from '@app/lib/db';

//Gets called from the API and returns search results
//Finds all values that contain string in ID
export async function searchId(id1: string) {

  const searchId = await db.user.findUnique({
    where: {
      id: id1,
  },
});

  const returnedData = await searchId;
  return returnedData
}
