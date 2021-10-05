import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import {
  getMovieComments,
  createMovieComment,
  CreateMovieCommentInput,
  CreateMovieCommentResult,
} from "@app/services/comment";

type CreateMovieCommentResponse = CreateMovieCommentResult;

export type CommentPostBody = Pick<CreateMovieCommentInput, "text">;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (req.method === "POST") {
    if (!session) {
      return res.status(401).end();
    }
    const body = req.body as CommentPostBody;

    const newComment = (await createMovieComment({
      movieId: req.query.movieId as string,
      text: body.text,
      user: { connect: { id: session.uid } },
    })) as CreateMovieCommentResponse;

    return res.status(201).send(newComment);
  }

  if (req.method === "GET") {
    const { movieId } = req.query;
    const movieComments = await getMovieComments(movieId as string);

    return res.status(200).send(movieComments);
  }

  return res.status(404).end();
};

export default handler;
