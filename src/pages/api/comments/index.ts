import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import {
  createMovieComment,
  CreateMovieCommentInput,
  CreateMovieCommentResult,
} from "@app/services/comment";

type CommentPostBody = Pick<CreateMovieCommentInput, "movieId" | "text">;

type CreateMovieCommentResponse = CreateMovieCommentResult;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "POST") {
    const body = req.body as CommentPostBody;

    const newComment = (await createMovieComment({
      movieId: body.movieId,
      text: body.text,
      user: { connect: { id: session.uid } },
    })) as CreateMovieCommentResponse;

    return res.status(201).send(newComment);
  }

  return res.status(404).end();
};

export default handler;
