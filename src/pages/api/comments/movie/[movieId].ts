import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import {
  getMovieComments,
  createMovieComment,
  CreateMovieCommentInput,
  CreateMovieCommentResult,
} from "@app/services/comment";

type CreateMovieCommentResponse = CreateMovieCommentResult;

export type CommentPostBody = {
  text: string;
  parentId?: string;
};

const handler: NextApiHandler = async (req, res) => {
  // ensure comments can be reported by logged in users
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).end();
    }
    const body = req.body as CommentPostBody;
    // create a comment by passing in the associated movie, text and associated user
    const newComment = (await createMovieComment({
      movieId: req.query.movieId as string,
      text: body.text,
      user: { connect: { id: session.uid } },
      ...(body.parentId && {
        parent: { connect: { id: body.parentId } },
      }),
    })) as CreateMovieCommentResponse;

    return res.status(201).send(newComment);
  }
  // return an array of comments assocaited to that movie
  if (req.method === "GET") {
    const { movieId } = req.query;
    const movieComments = await getMovieComments(movieId as string);

    return res.status(200).send(movieComments);
  }

  return res.status(404).end();
};

export default handler;
