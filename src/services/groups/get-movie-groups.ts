import { db } from "@app/lib/db";
import { MovieGroup, User } from "@prisma/client";

export interface TransformedMovieGroup {
  id: MovieGroup["id"];
  emoji: MovieGroup["emoji"];
  name: MovieGroup["name"];
  imageBackdrop: string;
  movieCount: number;
}

export type GetMovieGroupResponse = TransformedMovieGroup[];

export async function getMovieGroups(userId: User["id"]): Promise<GetMovieGroupResponse> {
  const movieGroups = await db.movieGroup.findMany({ where: { ownerId: userId } }); //query to db through Prisma Client

  /**
   * For each movie group, we have transformed the Movie model in the db to another model which we can use per business logic.
   */
  const transformedMovieGroups = movieGroups.map(async (mg): Promise<TransformedMovieGroup> => {
    const latestMovieId = mg.movieIds[mg.movieIds.length - 1];
    return {
      id: mg.id,
      emoji: mg.emoji,
      imageBackdrop: "https://image.tmdb.org/t/p/original/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg", //lastestMovieId.poster
      movieCount: mg.movieIds.length,
      name: mg.name,
    };
  });
  return await Promise.all(transformedMovieGroups);
}
