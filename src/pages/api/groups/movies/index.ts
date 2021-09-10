import { NextApiHandler } from "next";
import {
  getMovieGroups,
  createMovieGroup,
  deleteMovieGroup,
  CreateMovieGroupInput,
  DeleteMovieGroupInput,
  TransformedMovieGroup,
  CreateMovieGroupResult,
  DeleteMovieGroupResult,
} from "@app/services/groups";
import { getSession } from "next-auth/client";
import { MovieGroup } from ".prisma/client";

export interface MovieGroupPostBody extends Pick<CreateMovieGroupInput["data"], "emoji" | "name"> {}
export interface MovieGroupDeleteBody extends Pick<DeleteMovieGroupInput["where"], "id"> {}

export type GetMovieGroupsResponse = TransformedMovieGroup[];
export type CreateMovieGroupResponse = CreateMovieGroupResult;
export type DeleteMovieGroupResponse = DeleteMovieGroupResult;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const movieGroups = (await getMovieGroups(session.uid!)) as GetMovieGroupsResponse;
    return res.send(movieGroups);
  }

  if (req.method === "POST") {
    const mGDetails = req.body as MovieGroupPostBody;

    const newMovieGroup = (await createMovieGroup({
      data: {
        emoji: mGDetails.emoji,
        name: mGDetails.name,
        ownerId: session.uid!,
      },
    })) as CreateMovieGroupResponse;
    return res.send(newMovieGroup);
  }

  // if (req.method === "PUT"){
  //   const updatedMovieGroup = await editMovieGroup(session.uid!);
  //   return res.send(updatedMovieGroup);
  // }

  if (req.method === "DELETE") {
    const mGDetails = req.body as MovieGroupDeleteBody;
    const deletedResult = (await deleteMovieGroup({
      where: { id: mGDetails.id },
    })) as DeleteMovieGroupResponse;
    return res.send(deletedResult);
  }

  return res.status(404).end();
};

export default handler;
