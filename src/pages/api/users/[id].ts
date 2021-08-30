// https://nextjs.org/docs/api-routes/dynamic-api-routes

import { NextApiHandler } from "next";
import { getUser } from "@app/services/user";

const handler: NextApiHandler = async (req, res) => {
  // Shortcut for: const id = req.query.id;
  const { id } = req.query;

  // <string>id (Casting to another type)
  // Call our service in the API handler
  const user = await getUser(id as string);

  return res.send(user);
};

export default handler;
