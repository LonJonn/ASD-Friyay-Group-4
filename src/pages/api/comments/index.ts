import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import {
  createMovieComment,
  CreateMovieCommentInput,
  CreateMovieCommentResult,
} from "@app/services/comment";

export type CommentPostBody = Pick<CreateMovieCommentInput, "text">;

type CreateMovieCommentResponse = CreateMovieCommentResult;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  return res.status(404).end();
};

export default handler;
