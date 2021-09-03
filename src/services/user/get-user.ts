import { db } from "@app/lib/db";

export async function getUser(id: string) {
  const user = await db.user.findUnique({ where: { id } });

  if (!user) {
    throw new Error("No user with that ID exists.");
  }

  return user;
}
