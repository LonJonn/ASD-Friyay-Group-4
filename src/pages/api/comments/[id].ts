import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import {
  deleteMovieComment,
  DeleteMovieCommentResult,
  updateMovieComment,
  UpdateMovieCommentInput,
  UpdateMovieCommentResult,
} from "@app/services/comment";

type DeleteMovieCommentResponse = DeleteMovieCommentResult;
type UpdateMovieCommentResponse = UpdateMovieCommentResult;

export type CommentUpdateBody = Pick<UpdateMovieCommentInput, "id" | "text">;

const handler: NextApiHandler = async (req, res) => {
  // ensure comments can be reported by logged in users
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  // delete movie comment based on id
  if (req.method === "DELETE") {
    const id = req.query.id as string;
    const deleteComment = (await deleteMovieComment({
      where: { id },
    })) as DeleteMovieCommentResponse;
    return res.send(deleteComment);
  }
  // update movie comment based on id and replace text
  if (req.method === "PUT") {
    const id = req.query.id as string;
    const body = req.body as CommentUpdateBody;
    const updateComment = (await updateMovieComment({
      id: id,
      text: body.text,
    })) as UpdateMovieCommentResponse;
    return res.send(updateComment);
  }
};

export default handler;
