import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { getDiscoverMovies } from "@app/services/movie";


const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const movies = await getDiscoverMovies(id as string);

    return res.send(movies);
  };

export default handler;