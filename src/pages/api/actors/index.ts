import { getPopularActors, GetPopularActorsResult } from "@app/services/actor/get-popular-actors";
import { searchActor, SearchActorResult } from "@app/services/actor/search-actor";
import { NextApiHandler } from "next";

export type GetActorResponse = GetPopularActorsResult | SearchActorResult;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    // Grab the query from the request query params
    const query = req.query.query as string;

    // Use the searchActor service if theres a serach query, otherwise just get the popular actors
    const data = query ? await searchActor({ name: query }) : await getPopularActors();

    return res.json(data as GetActorResponse);
  }

  res.status(404).end();
};

export default handler;
