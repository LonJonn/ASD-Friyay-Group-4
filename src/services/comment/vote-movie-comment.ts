import { db } from "@app/lib/db";
import { Comment } from "@prisma/client";

export type VoteMovieCommentInput = { id: Comment["id"] };
export type VoteMovieCommentResult = Comment;

export async function upvoteMovieComment(
  args: VoteMovieCommentInput
): Promise<VoteMovieCommentResult> {
  const upvoteResult = await db.comment.update({
    where: { id: args.id },
    data: { likes: +1 },
  });
  return upvoteResult;
}

export async function downvoteMovieComment(
  args: VoteMovieCommentInput
): Promise<VoteMovieCommentResult> {
  const downvoteResult = await db.comment.update({
    where: { id: args.id },
    data: { likes: -1 },
  });
  return downvoteResult;
}
