import { Review } from "@prisma/client";
import { db } from "@app/lib/db";

export type GetUsersReviewsResponse = Review[];

export async function getUsersReviews(userId: string, userInput: string): Promise<GetUsersReviewsResponse> {

  // sort reviews by most recently Made 
  if (userInput === "mostRecent"){
    const userReviews = await db.review.findMany({ where: { ownerId: userId }, orderBy:[{ createdAt: 'desc'}] });

    return userReviews;
  } 
  
  // sort by most liked reviews 
  else if (userInput === "mostLiked"){
    const userReviews = await db.review.findMany({ where: { ownerId: userId }, orderBy:[{ likes: 'desc'}] });

    return userReviews;
  } 

  // sort by most disliked review
  else if (userInput === "mostDisliked"){
    const userReviews = await db.review.findMany({ where: { ownerId: userId }, orderBy:[{ dislikes: 'desc'}] });

    return userReviews;
  }  
  
  // if no options are picked then don't sort
  else {
    const userReviews = await db.review.findMany({ where: { ownerId: userId }});

    return userReviews;
  }
}