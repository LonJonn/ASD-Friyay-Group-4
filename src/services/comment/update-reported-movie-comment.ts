import { db } from "@app/lib/db";
import { Comment } from "@prisma/client";

export type UpdateReportedMovieCommentInput = { id: Comment["id"] };
export type UpdateReportedMovieCommentResult = Comment;

export async function updateReportedMovieComment(
  args: UpdateReportedMovieCommentInput
): Promise<UpdateReportedMovieCommentResult> {
  const updateResult = await db.comment.update({
    where: { id: args.id },
    data: { reported: true },
  });

  return updateResult;
}
