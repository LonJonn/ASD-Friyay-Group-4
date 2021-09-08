
import { db } from '@app/lib/db';


//Runs the user.delete function in prisma and uses the passed API variable to delete the selected user
export async function deleteUser(id: any) {
  const deleteUser = await db.user.delete({
    where: {
      email: id,
    },
  });
}

