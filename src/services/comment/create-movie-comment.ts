import { db } from "@app/lib/db";
import { Comment, Prisma } from "@prisma/client";

export type CreateMovieCommentInput = Prisma.CommentCreateInput;
export type CreateMovieCommentResult = Comment;

export async function createMovieComment(
  args: CreateMovieCommentInput
): Promise<CreateMovieCommentResult> {
  const newComment = await db.comment.create({ data: args });
  return newComment;
}
