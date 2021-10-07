import { db } from "@app/lib/db";
import { Comment } from "@prisma/client";

export type UpdateReportedMovieCommentInput = { id: Comment["id"] };
export type UpdateReportedMovieCommentResult = Comment;

// update a reported bool value to true based on id
export async function updateReportedMovieCommentToTrue(
  args: UpdateReportedMovieCommentInput
): Promise<UpdateReportedMovieCommentResult> {
  const updateResult = await db.comment.update({
    where: { id: args.id },
    data: { reported: true },
  });

  return updateResult;
}

// update a reported bool value to false based on id
export async function updateReportedMovieCommentToFalse(
  args: UpdateReportedMovieCommentInput
): Promise<UpdateReportedMovieCommentResult> {
  const updateResult = await db.comment.update({
    where: { id: args.id },
    data: { reported: false },
  });

  return updateResult;
}
