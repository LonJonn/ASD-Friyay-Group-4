import { db } from "@app/lib/db";
import { MovieGroup, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

//Interface used in the Service
export type DeleteMovieGroupInput = Prisma.MovieGroupDeleteArgs;

//Return type of service
export type DeleteMovieGroupResult = MovieGroup;

export async function deleteMovieGroup(
  args: DeleteMovieGroupInput
): Promise<DeleteMovieGroupResult> {
  const createResult = await db.movieGroup.delete(args);

  return createResult;
}
