import { Actor, ActorSearchResult } from "@app/typings";

export type SearchActorInput = {
  name: string;
};

export type SearchActorResult = ActorSearchResult["results"];

export async function searchActor(input: SearchActorInput): Promise<SearchActorResult> {
  const actorUrl = `https://api.themoviedb.org/3/search/person/?query=${input.name}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const res = await fetch(actorUrl);

  if (res.status !== 200) {
    return [];
  }

  const data = (await res.json()) as ActorSearchResult;

  return data.results;
}
