import { db } from "@app/lib/db";
import { Comment, User } from "@prisma/client";

export type GetMovieCommentsInput = Comment["movieId"];
export type GetMovieCommentsResult = (Comment & { user: User })[];

// reutrn many comments by movie id
export async function getMovieComments(
  args: GetMovieCommentsInput
): Promise<GetMovieCommentsResult> {
  const movieComments = await db.comment.findMany({
    where: { movieId: args },
    include: { user: true },
  });

  if (!movieComments) {
    throw new Error("Comments not found...");
  }
  return movieComments;
}
