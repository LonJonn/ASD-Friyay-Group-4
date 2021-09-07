
import { PrismaClient } from '@prisma/client'

//Runs the user.delete function in prisma and uses the passed API variable to delete the selected user
export async function deleteUser(id) {
  const deleteUser = await prisma.user.delete({
    where: {
      email: id,
    },
  });
}

