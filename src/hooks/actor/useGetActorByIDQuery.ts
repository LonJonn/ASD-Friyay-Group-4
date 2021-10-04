import { useQuery, UseQueryOptions } from "react-query";

import { GetActorByIDResponse } from "@app/pages/api/actors/[id]";

const timeout = 60000;

async function fetcher(id: string): Promise<GetActorByIDResponse> {
  return fetch(`/api/actors/${id}`).then((res) => res.json());
}

function getQueryKey(id: string) {
  return ["actor", id];
}

export function useGetActorByIDQuery(id: string, options?: UseQueryOptions<GetActorByIDResponse>) {
  return useQuery<GetActorByIDResponse>({
    staleTime: timeout,
    cacheTime: timeout,
    ...options,
    queryKey: getQueryKey(id),
    queryFn: () => fetcher(id),
  });
}

useGetActorByIDQuery.fetcher = fetcher;
useGetActorByIDQuery.getQueryKey = getQueryKey;
useGetActorByIDQuery.timeout = timeout;
