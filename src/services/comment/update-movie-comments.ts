import { db } from "@app/lib/db";
import { Comment } from "@prisma/client";

export type UpdateMovieCommentInput = { id: Comment["id"]; text: Comment["text"] };
export type UpdateMovieCommentResult = Comment;

// update a comment by id and replace text
export async function updateMovieComment(
  args: UpdateMovieCommentInput
): Promise<UpdateMovieCommentResult> {
  const updateResult = await db.comment.update({
    where: { id: args.id },
    data: { text: args.text },
  });

  return updateResult;
}
