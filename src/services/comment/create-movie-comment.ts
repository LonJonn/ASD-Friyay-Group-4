import { db } from "@app/lib/db";
import { Comment, Prisma } from "@prisma/client";

export type CreateMovieCommentInput = Prisma.CommentCreateInput;
export type CreateMovieCommentResult = Comment;

export async function createMovieComment(
  input: CreateMovieCommentInput
): Promise<CreateMovieCommentResult> {
  const newComment = await db.comment.create({ data: input });
  return newComment;
}
