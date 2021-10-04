import { useQuery, UseQueryOptions } from "react-query";

export interface ActorCredits {
  cast: Cast[];
  crew: Cast[];
  id: number;
}

export interface Cast {
  character?: string;
  credit_id: string;
  release_date: Date;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  genre_ids: number[];
  original_language: OriginalLanguage;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: null | string;
  overview: string;
  poster_path: null | string;
  department?: Department;
  job?: Job;
}

export enum Department {
  Production = "Production",
}

export enum Job {
  ExecutiveProducer = "Executive Producer",
  Producer = "Producer",
}

export enum OriginalLanguage {
  En = "en",
}

const timeout = 60000;

async function fetcher(id: string): Promise<ActorCredits> {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json());
}

function getQueryKey(id: string) {
  return ["actor", id, "credits"];
}

export function useActorCreditsQuery(id: string, options?: UseQueryOptions<ActorCredits>) {
  return useQuery<ActorCredits>({
    staleTime: timeout,
    cacheTime: timeout,
    ...options,
    queryKey: getQueryKey(id),
    queryFn: () => fetcher(id),
  });
}

useActorCreditsQuery.fetcher = fetcher;
useActorCreditsQuery.getQueryKey = getQueryKey;
useActorCreditsQuery.timeout = timeout;
