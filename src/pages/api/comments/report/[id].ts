import {
  updateReportedMovieComment,
  UpdateReportedMovieCommentResult,
} from "@app/services/comment";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

type UpdateReportedCommentResponse = UpdateReportedMovieCommentResult;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  if (req.method === "PUT") {
    const id = req.query.id as string;
    const updateComment = (await updateReportedMovieComment({
      id: id,
    })) as UpdateReportedCommentResponse;
    return res.send(updateComment);
  }
};

export default handler;
