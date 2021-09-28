import { MovieGroup, Prisma } from ".prisma/client";
import { db } from "@app/lib/db";

export type UpdateMovieGroupInput = {
  where: { id: MovieGroup["id"] };
  data: Prisma.MovieGroupUpdateInput;
};
export type UpdateMovieGroupResult = MovieGroup;

export async function updateMovieGroup(
  args: UpdateMovieGroupInput
): Promise<UpdateMovieGroupResult> {
  const updatedGroup = await db.movieGroup.update(args);
  return updatedGroup;
}
