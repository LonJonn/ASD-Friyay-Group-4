import { Prisma } from "@prisma/client";
import { Review } from "@prisma/client";
import { db } from "@app/lib/db";

export type DeleteReviewInput = Prisma.ReviewDeleteArgs;

export type DeleteReviewResult = Review;

export async function deleteReview(args: DeleteReviewInput): Promise<DeleteReviewResult> {
  const createResult = await db.review.delete(args);

  return createResult;
}
