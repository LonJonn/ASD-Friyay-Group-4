import {
  createMovieGroup,
  CreateMovieGroupInput,
  CreateMovieGroupResult,
  getMovieGroups,
  TransformedMovieGroup,
} from "@app/services/groups";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

export interface MovieGroupPostBody extends Pick<CreateMovieGroupInput["data"], "emoji" | "name"> {}

export type GetMovieGroupsResponse = TransformedMovieGroup[];
export type CreateMovieGroupResponse = CreateMovieGroupResult;

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

  return res.status(404).end();
};

export default handler;
