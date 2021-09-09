import { NextApiHandler } from "next";
import { getMovieGroups, createMovieGroup, NewMovieGroup } from "@app/services/groups";
import { getSession } from "next-auth/client";
import { Prisma } from "@prisma/client";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const movieGroups = await getMovieGroups(session.uid!);
    return res.send(movieGroups);
  }

  if (req.method === "POST") {
    const mGDetails: NewMovieGroup = req.body;

    const args: Prisma.MovieGroupCreateArgs = {
      data: {
        emoji: mGDetails.emoji,
        name: mGDetails.name,
        ownerId: session.uid!,
      },
    };

    const newMovieGroup = await createMovieGroup(args);
    return res.send(newMovieGroup);
  }

  // if (req.method === "PUT"){
  //   const updatedMovieGroup = await editMovieGroup(session.uid!);
  //   return res.send(updatedMovieGroup);
  // }

  // if (req.method === "DELETE"){
  //   const deletedResult = await deleteMovieGroup(session.uid!);
  //   return res.send(deletedResult);
  // }

  return res.status(404).end();
};

export default handler;
