import { PrismaClient } from '@prisma/client';
import { db } from '@app/lib/db';

//Gets called from the API and returns search results
//Finds all values that contain string in email
export async function searchEmail(id1: string) {

  const searchEmail = await db.user.findMany({
    where: {
      email: {contains: id1},
  },
});

  const returnedData = await searchEmail;
  return returnedData
}
