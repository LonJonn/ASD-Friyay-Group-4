import { NextApiHandler } from "next";
import { GetActorResult, getActor } from "@app/services/actor/get-actor";

export type GetActorByIDResponse = GetActorResult;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    // Take in the id from the request param
    const id = req.query.id as string;

    const actor = await getActor({ id: id });

    return res.json(actor as GetActorByIDResponse);
  }

  res.status(404).end();
};

export default handler;
