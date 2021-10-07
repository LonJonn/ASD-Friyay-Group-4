import { Prisma } from "@prisma/client";
import { Review } from "@prisma/client";
import { db } from "@app/lib/db";

export type CreateReviewInput = Prisma.ReviewCreateArgs;
export type CreateReviewResult = Review;

export async function createReview(args: CreateReviewInput): Promise<CreateReviewResult>{
    const createResult = await db.review.create({data:{...args.data, likes: 0, dislikes: 0}});

    return createResult;
}