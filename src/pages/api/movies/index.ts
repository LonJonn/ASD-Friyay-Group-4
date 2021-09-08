import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { getPopularMovies } from "@app/services/movie";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).end();
    }
  
    const movies = await getPopularMovies();
  
    return res.send(movies);
  };
  
export default handler;