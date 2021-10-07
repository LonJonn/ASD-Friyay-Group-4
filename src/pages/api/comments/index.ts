import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { getReportedMovieComments, updateReportedMovieCommentToTrue } from "@app/services/comment/";
import Id from "@app/pages/groups/[id]";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const reportedComments = await getReportedMovieComments();

    return res.status(200).send(reportedComments);
  }

  return res.status(404).end();
};

export default handler;
