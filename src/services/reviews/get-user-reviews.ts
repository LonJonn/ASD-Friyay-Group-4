import { Review } from "@prisma/client";
import { db } from "@app/lib/db";

export type GetUsersReviewsResponse = Review[];

export async function getUsersReviews(userId: string): Promise<GetUsersReviewsResponse> {
  const userReviews = await db.review.findMany({ where: { ownerId: userId } });

  return userReviews;
}
