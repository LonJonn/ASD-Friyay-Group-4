import { db } from "@app/lib/db";
import { MovieGroup, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

//Interface used in the request sent by Page
//Transformation into the form of Prisma.MovieGroupCreateArgs occurs in the API Handler.
export interface NewMovieGroup {
  emoji: string;
  name: string;
}

export async function createMovieGroup(args: Prisma.MovieGroupCreateArgs) {
  const createResult = await db.movieGroup.create(args);
  return createResult;
}
