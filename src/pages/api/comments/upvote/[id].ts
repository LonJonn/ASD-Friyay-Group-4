import {
  upvoteMovieComment,
  VoteMovieCommentResult,
} from "@app/services/comment/vote-movie-comment";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

type UpvoteMovieCommentResponse = VoteMovieCommentResult;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  if (req.method === "PUT") {
    const id = req.query.id as string;
    const upvoteComment = (await upvoteMovieComment({
      id: id,
    })) as UpvoteMovieCommentResponse;
    return res.send(upvoteComment);
  }
};

export default handler;
