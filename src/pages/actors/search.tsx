import { NextPage } from "next";
import { useSearchActorsQuery } from "@app/hooks/actor/useSearchActorsQuery";
import { useRouter } from "next/router";
import { Heading, Stack, Input, Button, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ActorList } from "@app/components/actors/ActorList";
import React, { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

const ActorSearchPage: NextPage = () => {
  const router = useRouter();

  // Grab the current serach query from the url, or default to empty query
  const searchQuery = (router.query.query as string) || "";
  const [queryValue, setQueryValue] = useState(searchQuery);

  // Fire off the actor search query
  const query = useSearchActorsQuery(searchQuery);

  return (
    <Stack spacing={8}>
      <Heading size="lg">Search for actors</Heading>

      {/* Search Form */}
      <Stack
        as="form"
        direction="row"
        onSubmit={(e) => {
          e.preventDefault();

          router.push(`/actors/search?query=${queryValue}`);
        }}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            value={queryValue}
            onChange={(e) => setQueryValue(e.currentTarget.value)}
          />
        </InputGroup>

        <Button type="submit">Search</Button>
      </Stack>

      {/* Results */}
      {query.status === "success" && <ActorList actors={query.data} />}
    </Stack>
  );
};

export default ActorSearchPage;
