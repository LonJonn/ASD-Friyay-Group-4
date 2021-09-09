import { NextApiHandler } from "next";
import { getMovieGroups, createMovieGroup, CreateMovieGroupInput } from "@app/services/groups";
import { getSession } from "next-auth/client";

export interface MovieGroupPostBody extends Pick<CreateMovieGroupInput["data"], "emoji" | "name"> {}

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
    const mGDetails: MovieGroupPostBody = req.body;

    const newMovieGroup = await createMovieGroup({
      data: {
        emoji: mGDetails.emoji,
        name: mGDetails.name,
        ownerId: session.uid!,
      },
    });
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
