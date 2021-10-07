import { db } from "@app/lib/db";
import { Comment, Prisma } from "@prisma/client";

export type DeleteMovieCommentInput = Prisma.CommentDeleteArgs;
export type DeleteMovieCommentResult = Comment;

// delete a comment by comment id
export async function deleteMovieComment(
  args: DeleteMovieCommentInput
): Promise<DeleteMovieCommentResult> {
  const deleteResult = await db.comment.delete(args);
  return deleteResult;
}
