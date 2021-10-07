import { db } from "@app/lib/db";
import { Comment } from "@prisma/client";

export type UpdateReportedMovieCommentInput = { id: Comment["id"] };
export type UpdateReportedMovieCommentResult = Comment;

export async function updateReportedMovieCommentToTrue(
  args: UpdateReportedMovieCommentInput
): Promise<UpdateReportedMovieCommentResult> {
  const updateResult = await db.comment.update({
    where: { id: args.id },
    data: { reported: true },
  });

  return updateResult;
}

export async function updateReportedMovieCommentToFalse(
  args: UpdateReportedMovieCommentInput
): Promise<UpdateReportedMovieCommentResult> {
  const updateResult = await db.comment.update({
    where: { id: args.id },
    data: { reported: false },
  });

  return updateResult;
}
