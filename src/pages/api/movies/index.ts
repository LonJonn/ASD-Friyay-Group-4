import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { getPopularMovies, getMovies } from "@app/services/movie";

export interface MovieSearchPostBody {
  search: string;
}

const handler: NextApiHandler = async (req, res) => {   
    if (req.method === "GET") {
      const movies = await getPopularMovies();
      return res.send(movies);
    }
  };
  
export default handler;