import { NextApiHandler } from "next";

import { getMovieComments, GetMovieCommentsResult } from "@app/services/comment";

export type MovieCommentsGetResponse = GetMovieCommentsResult;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { movieId } = req.query;
    const movieComments = await getMovieComments(Number(movieId));

    return res.status(200).send(movieComments);
  }

  return res.status(404).end();
};

export default handler;
