import { Heading, Stack, Text } from "@chakra-ui/layout";
import { NextPage } from "next";

import { usePopularActorsQuery } from "@app/hooks/actor/usePopularActorsQuery";
import { ActorList } from "@app/components/actors/ActorList";

const ActorsPage: NextPage = () => {
  // Fire off popular actors query
  const query = usePopularActorsQuery();

  return (
    <Stack spacing="8">
      <Heading>Popular Actors</Heading>
      {query.status === "error" && <Text>Something went wrong. Please try again.</Text>}
      {query.status === "success" && <ActorList actors={query.data} />}
    </Stack>
  );
};

export default ActorsPage;
