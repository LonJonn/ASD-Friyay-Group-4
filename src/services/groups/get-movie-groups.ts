import { db } from "@app/lib/db";
import { GetMovieGroupsResponse } from "@app/pages/api/groups/movies";
import { MovieGroup, User } from "@prisma/client";
import { getMovie } from "../movie/get-movie";

export interface TransformedMovieGroup {
  id: MovieGroup["id"];
  emoji: MovieGroup["emoji"];
  name: MovieGroup["name"];
  imageBackdrop: string;
  movieCount: number;
}

export async function getMovieGroups(userId: User["id"]): Promise<GetMovieGroupsResponse> {
  const movieGroups = await db.movieGroup.findMany({ where: { ownerId: userId } }); //query to db through Prisma Client

  /**
   * For each movie group, we have transformed the Movie model in the db to another model which we can use per business logic.
   */
  const transformedMovieGroups = movieGroups.map(async (mg): Promise<TransformedMovieGroup> => {
    var imageBackdrop = "https://image.tmdb.org/t/p/original/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg";
    if (mg.movieIds.length > 0) {
      const movieData = await getMovie(mg.movieIds[mg.movieIds.length - 1]);
      imageBackdrop = movieData.backdrop_path;
    }

    return {
      id: mg.id,
      emoji: mg.emoji,
      imageBackdrop: `https://image.tmdb.org/t/p/original/${imageBackdrop}`,
      movieCount: mg.movieIds.length,
      name: mg.name,
    };
  });

  return await Promise.all(transformedMovieGroups);
}
