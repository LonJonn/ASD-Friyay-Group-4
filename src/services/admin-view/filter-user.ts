import { PrismaClient } from '@prisma/client';
import { db } from '@app/lib/db';

//Gets called from the API and returns filtered users based on the selected filter
export async function filterUser(id1: string) {

//Sort users A-Z  
if (id1 == "az") {
  const filterUsers = await db.user.findMany({
    orderBy: [
    {
      name: 'asc',
    },
  ],

});

const returnedData = await filterUsers;

return returnedData;

//Sort users Z-A
} else if (id1 == "za") {
  const filterUsers = await db.user.findMany({
    orderBy: [
    {
      name: 'desc',
    },
  ],

});
const returnedData = await filterUsers;

return returnedData;

//Sort users by most recently created
} else if (id1 == "rCreated") {
  const filterUsers = await db.user.findMany({
    orderBy: [
    {
      createdAt: 'desc',
    },
  ],

});
const returnedData = await filterUsers;

return returnedData;

//Sort users by most recently updated/edited
} else {
  const filterUsers = await db.user.findMany({
    orderBy: [
    {
      updatedAt: 'desc',
    },
  ],

});
const returnedData = await filterUsers;

return returnedData;
}
}
