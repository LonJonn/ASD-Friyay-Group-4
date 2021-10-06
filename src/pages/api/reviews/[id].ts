import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { UpdateReviewInput, updateUserReview} from "@app/services/reviews";

export type UpdateReviewBody = UpdateReviewInput["data"];

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session){
        return res.status(401).end();
    }

    if (req.method === "PUT") {
        const reviewId = req.query.id as string;
        const updatedReviewBody = req.body as UpdateReviewBody;
        const updatedReview = await updateUserReview({
          where: { id: reviewId },
          data: updatedReviewBody,
        });
    
        return res.send(updatedReview);
      }

      return res.status(404).end();
}

export default handler;