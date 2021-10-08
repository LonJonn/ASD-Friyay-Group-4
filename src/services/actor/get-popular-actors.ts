import { ActorSearchResult } from "@app/typings";

export type GetPopularActorsResult = ActorSearchResult["results"];

export async function getPopularActors(): Promise<GetPopularActorsResult> {
  const actorUrl = `https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const res = await fetch(actorUrl);

  // If TMDB API call isn't successful, return an empty array
  if (res.status !== 200) {
    return [];
  }

  const data = (await res.json()) as ActorSearchResult;

  // Take only the results
  return data.results;
}
