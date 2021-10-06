import { Prisma } from "@prisma/client";
import { Review } from "@prisma/client";
import { db } from "@app/lib/db";

export type UpdateReviewInput = {
  where: { id: Review["id"] };
  data: Prisma.ReviewUpdateInput;
};
export type UpdateReviewResult = Review;

export async function updateUserReview(args: UpdateReviewInput): Promise<UpdateReviewResult> {
  const updatedUserReview = await db.review.update(args);

  return updatedUserReview;
}
