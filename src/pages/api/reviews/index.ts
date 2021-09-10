import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { getUsersReviews, createReview, CreateReviewInput } from "@app/services/reviews";

export interface ReviewGroupPostBody extends Pick<CreateReviewInput["data"], "title" | "text" | "ratings"> {}

const handler: NextApiHandler = async(req, res) =>{
    const session = await getSession({req});
    if(!session){
        return res.status(401).end();
    }

    if(req.method === "GET"){
        const userReviews = await getUsersReviews(session.uid!)
        return res.send(userReviews);
    }
    
    if (req.method === "POST"){
        const reviewDetails: ReviewGroupPostBody = req.body;

        const newUserReview = await createReview({
            data:{
                title: reviewDetails.title,
                text: reviewDetails.text,
                ratings: reviewDetails.ratings,
                movieId: "",
                ownerId: session.uid!,
            }
        });
        return res.send(newUserReview);
    }

    return res.status(404).end();
}

export default handler;