import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import {
  deleteMovieComment,
  DeleteMovieCommentResult,
  updateMovieComment,
  UpdateMovieCommentInput,
  UpdateMovieCommentResult,
  getReportedMovieComments,
  updateReportedMovieCommentToTrue,
  UpdateReportedMovieCommentResult,
} from "@app/services/comment";

type DeleteMovieCommentResponse = DeleteMovieCommentResult;
type UpdateMovieCommentResponse = UpdateMovieCommentResult;

export type CommentUpdateBody = Pick<UpdateMovieCommentInput, "id" | "text">;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "DELETE") {
    const id = req.query.id as string;
    const deleteComment = (await deleteMovieComment({
      where: { id },
    })) as DeleteMovieCommentResponse;
    return res.send(deleteComment);
  }

  if (req.method === "PUT") {
    const id = req.query.id as string;
    const body = req.body as CommentUpdateBody;
    const updateComment = (await updateMovieComment({
      id: id,
      text: body.text,
    })) as UpdateMovieCommentResponse;
    return res.send(updateComment);
  }

  if (req.method === "GET") {
    const reportedComments = await getReportedMovieComments();

    return res.status(200).send(reportedComments);
  }

  return res.status(404).end();
};

export default handler;
