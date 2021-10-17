import {
  updateReportedMovieCommentToTrue,
  UpdateReportedMovieCommentResult,
} from "@app/services/comment";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

type UpdateReportedCommentResponse = UpdateReportedMovieCommentResult;

const handler: NextApiHandler = async (req, res) => {
  // ensure comments can be reported by logged in users
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  // update a reported movie comment by updating reported flag to true
  if (req.method === "PUT") {
    const id = req.query.id as string;
    const updateComment = (await updateReportedMovieCommentToTrue({
      id: id,
    })) as UpdateReportedCommentResponse;
    return res.send(updateComment);
  }
};

export default handler;
