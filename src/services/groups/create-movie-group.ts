import { db } from "@app/lib/db";
import { MovieGroup, User } from "@prisma/client";
import { NewMovieGroup } from "@app/pages/groups/index";

export async function createMovieGroup(group: NewMovieGroup, userId: User["id"]) {
  const createResult = await db.movieGroup.create({
    data: {
      emoji: group.emoji,
      name: group.name,
      movieIds: [],
      ownerId: userId,
    },
  });
  return createResult;
}
