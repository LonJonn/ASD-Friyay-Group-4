import { GetActorResponse } from "@app/pages/api/actors/index";
import { useQuery, UseQueryOptions } from "react-query";

const timeout = 60000;

async function fetcher(query: string): Promise<GetActorResponse> {
  return fetch(`/api/actors?query=${query}`).then((res) => res.json());
}

function getQueryKey(query: string) {
  return ["actors", "search", query];
}

export function useSearchActorsQuery(query: string, options?: UseQueryOptions<GetActorResponse>) {
  return useQuery<GetActorResponse>({
    staleTime: timeout,
    cacheTime: timeout,
    ...options,
    queryKey: getQueryKey(query),
    queryFn: () => fetcher(query),
  });
}

useSearchActorsQuery.fetcher = fetcher;
useSearchActorsQuery.getQueryKey = getQueryKey;
useSearchActorsQuery.timeout = timeout;
