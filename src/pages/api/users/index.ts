import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { getAllUsers } from "@app/services/user";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  const users = await getAllUsers();

  return res.send(users);
};

export default handler;
