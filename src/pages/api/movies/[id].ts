import { NextApiHandler } from "next";

import { getMovie } from "@app/services/movie";

const handler: NextApiHandler = async (req, res) => {
  // The API retrieves the id value from the API query
  const { id } = req.query;

  // The API then awaits a response from the getMovie service
  if (req.method === "GET") {
    const movie = await getMovie(id as string);
    return res.send(movie);
  }

};

export default handler;