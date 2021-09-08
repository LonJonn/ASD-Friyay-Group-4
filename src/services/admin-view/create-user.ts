
import { PrismaClient } from '@prisma/client'

//Gets called from the API and attempts to add a new user to the database.
// A string value gets passed through to the function which gets split into the seperate name and email variables and passed to prisma.user.create function.
export async function createUser(id1) {
  //Seperate string into 2 elements
  var data = id1.split(',');

  var name = data[0];
  var email = data[1];

  const createUser = await prisma.user.create({
    data: {
      name: name,
      email: email
    },
  });
}