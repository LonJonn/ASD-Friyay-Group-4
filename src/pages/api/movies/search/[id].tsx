import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { getMovies } from "@app/services/movie";

export interface MovieSearchPostBody {
  search: string;
}

const handler: NextApiHandler = async (req, res) => {
    const movies = await getMovies(req.query['id'] as string);

    return res.send(movies);
  };

export default handler;