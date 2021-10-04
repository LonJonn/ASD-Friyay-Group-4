import { getPopularActors, GetPopularActorsResult } from "@app/services/actor/get-popular-actors";
import { searchActor, SearchActorResult } from "@app/services/actor/search-actor";
import { NextApiHandler } from "next";

export type GetActorResponse = GetPopularActorsResult | SearchActorResult;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const query = req.query.query as string;

    const data = query ? await searchActor({ name: query }) : await getPopularActors();

    return res.json(data as GetActorResponse);
  }

  res.status(404).end();
};

export default handler;
