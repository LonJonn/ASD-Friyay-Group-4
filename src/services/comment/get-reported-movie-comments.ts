import { db } from "@app/lib/db";
import { Comment } from "@prisma/client";

export type GetReportedMovieCommentsResult = Comment[];

export async function getReportedMovieComments(): Promise<GetReportedMovieCommentsResult> {
  const reportedComments = await db.comment.findMany({ where: { reported: true } });

  if (!reportedComments) {
    throw new Error("Reported comments not found...");
  }

  return reportedComments;
}
