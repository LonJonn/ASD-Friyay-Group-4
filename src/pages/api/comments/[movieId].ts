import { NextApiHandler } from "next";

import {
  deleteMovieComment,
  DeleteMovieCommentInput,
  DeleteMovieCommentResult,
  getMovieComments,
  GetMovieCommentsResult,
} from "@app/services/comment";

export type MovieCommentsGetResponse = GetMovieCommentsResult;

type CommentDeleteBody = Pick<DeleteMovieCommentInput["where"], "id">;

type DeleteMovieCommentResponse = DeleteMovieCommentResult;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { movieId } = req.query;
    const movieComments = await getMovieComments(Number(movieId));

    return res.status(200).send(movieComments);
  }

  if (req.method === "DELETE") {
    const comment = req.body as CommentDeleteBody;
    const deleteComment = (await deleteMovieComment({
      where: { id: comment.id },
    })) as DeleteMovieCommentResponse;
    return res.send(deleteComment);
  }
  return res.status(404).end();
};

export default handler;
