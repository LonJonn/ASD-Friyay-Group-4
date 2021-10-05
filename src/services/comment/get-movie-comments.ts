import { db } from "@app/lib/db";
import { Comment } from "@prisma/client";

export type GetMovieCommentsInput = Comment["movieId"];
export type GetMovieCommentsResult = Comment[];

export async function getMovieComments(
  args: GetMovieCommentsInput
): Promise<GetMovieCommentsResult> {
  const movieComments = await db.comment.findMany({ where: { movieId: args } });

  if (!movieComments) {
    throw new Error("Comments not found...");
  }

  return movieComments;
}
