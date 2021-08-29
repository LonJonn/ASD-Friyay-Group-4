import { NextApiHandler } from "next";
import { getMovieGroups } from "@app/services/groups/get-movie-groups";
import { getSession } from "next-auth/client";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const movieGroups = await getMovieGroups(session.uid!);
    return res.send(movieGroups);
  }

  return res.status(404).end();
};

export default handler;
