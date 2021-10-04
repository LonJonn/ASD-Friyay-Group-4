import { GetActorResponse } from "@app/pages/api/actors/index";
import { useQuery, UseQueryOptions } from "react-query";

const timeout = 60000;

async function fetcher(): Promise<GetActorResponse> {
  return fetch("/api/actors").then((res) => res.json());
}

function getQueryKey() {
  return ["popular-actors"];
}

export function usePopularActorsQuery(options?: UseQueryOptions<GetActorResponse>) {
  return useQuery<GetActorResponse>({
    staleTime: timeout,
    cacheTime: timeout,
    ...options,
    queryKey: getQueryKey(),
    queryFn: fetcher,
  });
}

usePopularActorsQuery.fetcher = fetcher;
usePopularActorsQuery.getQueryKey = getQueryKey;
usePopularActorsQuery.timeout = timeout;
