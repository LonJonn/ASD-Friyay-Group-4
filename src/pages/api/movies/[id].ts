import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { getMovie } from "@app/services/movie";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).end();
    }
    
    const { id } = req.query;
    const movie = await getMovie(id as string);

    return res.send(movie);
  };

export default handler;