import { db } from "@app/lib/db";
import { Comment } from "@prisma/client";

export type GetMovieCommentsInput = Comment["movieId"];
export type GetMovieCommentsResult = Comment[];

export async function getMovieComments(
  movieId: GetMovieCommentsInput
): Promise<GetMovieCommentsResult> {
  const movieComments = await db.comment.findMany({ where: { movieId } });

  if (!movieComments) {
    throw new Error("Comments not found...");
  }

  return movieComments;
}
