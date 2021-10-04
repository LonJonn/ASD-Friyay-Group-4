import { NextApiHandler } from "next";

import { getPopularMovies } from "@app/services/movie";

export interface MovieSearchPostBody {
  search: string;
}

const handler: NextApiHandler = async (req, res) => {   
  
  // The API awaits a response from the service  
  if (req.method === "GET") {
    const movies = await getPopularMovies();
    return res.send(movies);
  }
};
  
export default handler;