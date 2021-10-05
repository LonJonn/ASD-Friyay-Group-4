import { db } from "@app/lib/db";
import { MovieGroup } from "@prisma/client";

export type GetMovieGroupInput = { id: MovieGroup["id"] };

export type GetMovieGroupResult = MovieGroup | null;

export async function getMovieGroup(args: GetMovieGroupInput): Promise<GetMovieGroupResult> {
  const getResult = await db.movieGroup.findUnique({ where: args });

  return getResult;
}
