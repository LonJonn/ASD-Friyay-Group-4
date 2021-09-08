import { NextApiHandler } from "next";
import { getMovieGroups, createMovieGroup, NewMovieGroup } from "@app/services/groups";
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

  if (req.method === "POST") {
    const movieGroupCreateDetails: NewMovieGroup = req.body;
    console.log(movieGroupCreateDetails);
    const newMovieGroup = await createMovieGroup(movieGroupCreateDetails, session.uid!);
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
