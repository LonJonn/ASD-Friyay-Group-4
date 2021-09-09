import { db } from "@app/lib/db";
import { MovieGroup, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

//Interface used in the request sent by Page
export type CreateMovieGroupInput = Prisma.MovieGroupCreateArgs;

export type CreateMovieGroupResult = MovieGroup;

export async function createMovieGroup(
  args: CreateMovieGroupInput
): Promise<CreateMovieGroupResult> {
  const createResult = await db.movieGroup.create(args);

  return createResult;
}
