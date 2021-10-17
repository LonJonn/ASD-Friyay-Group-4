import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { getReportedMovieComments } from "@app/services/comment/";

const handler: NextApiHandler = async (req, res) => {
  // ensure comments can be reported by logged in users
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  // return an array of reported movie comments
  if (req.method === "GET") {
    const reportedComments = await getReportedMovieComments();

    return res.status(200).send(reportedComments);
  }

  return res.status(404).end();
};

export default handler;
