import { NextApiHandler } from "next";
import { Review } from "@prisma/client";
import { getSession } from "next-auth/client";
import {
  GetUsersReviewsResponse,
  getUsersReviews,
  createReview,
  CreateReviewInput,
  DeleteReviewInput,
  DeleteReviewResult,
  deleteReview,
  UpdateReviewInput,
  updateUserReview,
} from "@app/services/reviews";

export interface ReviewGroupPostBody extends Pick<CreateReviewInput["data"], "title" | "text" | "ratings"> {}
export interface ReviewDeleteBody extends Pick<DeleteReviewInput["where"], "id"> {}


export type DeleteReviewResponse = DeleteReviewResult;
export type UpdateReviewBody = UpdateReviewInput["data"];
export type getUserReviewsInput = {
  sort: "mostRecent" | "mostLiked" | "mostDisliked"
}

//Review Api 
const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  // Gets all user reviews sorted by 
  if (req.method === "GET") {
    const sort = req.query.sort as string

    const userReviews = await getUsersReviews(session.uid!, sort);
    return res.send(userReviews);
  }

  // Sends Input data to create-review service
  if (req.method === "POST") {
    const reviewDetails: ReviewGroupPostBody = req.body;

    const newUserReview = await createReview({
      data: {
        title: reviewDetails.title,
        text: reviewDetails.text,
        ratings: reviewDetails.ratings,
        movieId: "",
        likes: 0,
        dislikes: 0,
        ownerId: session.uid!,
      },
    });
    return res.send(newUserReview);
  }

  // Sends updated review input to update-reviews service
  if (req.method === "PUT") {
    const reviewId = req.query.id as string;
    const updatedReviewBody = req.body as UpdateReviewBody;
    const updatedReview = await updateUserReview({
      where: { id: reviewId },
      data: updatedReviewBody,
    });

    return res.send(updatedReview);
  }

  // sends deleted review input/onSubmit to delete-review service
  if (req.method === "DELETE") {
    const reviewDetails = req.body as ReviewDeleteBody;
    const deletedResult = (await deleteReview({
      where: { id: reviewDetails.id },
    })) as DeleteReviewResponse;
    return res.send(deletedResult);
  }

  return res.status(404).end();
};

export default handler;
