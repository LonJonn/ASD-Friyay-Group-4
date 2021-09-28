import { MovieGroup } from ".prisma/client";
import {
  deleteMovieGroup,
  DeleteMovieGroupInput,
  DeleteMovieGroupResult,
  updateMovieGroup,
  UpdateMovieGroupInput,
} from "@app/services/groups";
import { getGroupMovies, GetGroupMoviesResult } from "@app/services/groups/get-group-movies";
import { getMovieGroup } from "@app/services/groups/get-movie-group";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

export type GetMovieGroupResponse = MovieGroup & {
  movies: GetGroupMoviesResult;
};

export type DeleteMovieGroupResponse = DeleteMovieGroupResult;
export interface MovieGroupDeleteBody extends Pick<DeleteMovieGroupInput["where"], "id"> {}

export type UpdateMovieGroupBody = UpdateMovieGroupInput;

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const id = req.query.id as string;

    const movieGroup = await getMovieGroup({ id });
    const groupMovies = await getGroupMovies({ id });

    const result = Object.assign(movieGroup, { movies: groupMovies });
    return res.send(movieGroup);
  }

  if (req.method === "POST") {
  }

  if (req.method === "PUT") {
    const updatedMovieGroupBody = req.body as UpdateMovieGroupBody;
    const updatedMovieGroup = await updateMovieGroup(updatedMovieGroupBody);

    return res.send(updatedMovieGroup);
  }

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
