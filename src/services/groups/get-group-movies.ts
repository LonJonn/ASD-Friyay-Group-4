import { MovieGroup } from ".prisma/client";
import { db } from "@app/lib/db";
import { MovieDetail } from "@app/typings";
import { getMovie, GetMovieResponse } from "../movie";
import { getMovieGroup } from "./get-movie-group";

export type GetGroupMoviesInput = { id: MovieGroup["id"] };
export type GetGroupMoviesResult = GetMovieResponse[];

export async function getGroupMovies(args: GetGroupMoviesInput): Promise<GetGroupMoviesResult> {
  const movieGroup = await getMovieGroup(args);
  if (!movieGroup) {
    return [];
  }

  //loop over movie IDs in movieGroup
  const moviePromises = movieGroup.movieIds.map(getMovie);
  return Promise.all(moviePromises);
}
