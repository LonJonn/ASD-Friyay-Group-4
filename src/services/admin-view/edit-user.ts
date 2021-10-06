import { PrismaClient } from '@prisma/client';
import { db } from '@app/lib/db';

//Gets called from the API and attempts to edit a user that already exists in the database.
// A string value gets passed through to the function which gets split into the seperate new name, new email and old (current) email variables and passed to db.user.update function.
export async function editUser(id1: string) {

  //Seperate string into 2 elements
  var data = id1.split(',');

  var name = data[0];
  var email = data[1];
  var oldEmail = data[2];

  const editUser = await db.user.update({
    where: {
    email: oldEmail,
  },
  data: {
    name: name,
    email: email
  },
  });
}
