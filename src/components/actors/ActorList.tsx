import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useQueryClient } from "react-query";
import { useGetActorByIDQuery } from "@app/hooks/actor/useGetActorByIDQuery";
import { ActorCard } from "./ActorCard";
import { ActorResult } from "@app/typings";
import { useActorCreditsQuery } from "@app/hooks/actor/useActorCreditsQuery";

interface ActorListProps {
  actors: ActorResult[];
}

export function ActorList({ actors }: ActorListProps) {
  const queryClient = useQueryClient();

  function prefetchActorData(id: string) {
    queryClient.prefetchQuery({
      queryKey: useGetActorByIDQuery.getQueryKey(id),
      queryFn: () => useGetActorByIDQuery.fetcher(id),
      cacheTime: useGetActorByIDQuery.timeout,
      staleTime: useGetActorByIDQuery.timeout,
    });

    queryClient.prefetchQuery({
      queryKey: useActorCreditsQuery.getQueryKey(id),
      queryFn: () => useActorCreditsQuery.fetcher(id),
      cacheTime: useActorCreditsQuery.timeout,
      staleTime: useActorCreditsQuery.timeout,
    });
  }

  return (
    <Box>
      {actors.length === 0 && (
        <Heading size="xl" textAlign="center" mt={16}>
          No results 😢
        </Heading>
      )}

      {actors.length > 0 && (
        <Flex flexWrap="wrap" justifyContent="space-between" gridGap="12">
          {actors.map((actor) => (
            <ActorCard
              actor={actor}
              key={actor.id}
              onMouseOver={() => prefetchActorData(actor.id.toString())}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
}
