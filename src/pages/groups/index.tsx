import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import {
  Stack,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  SimpleGrid,
  Icon,
  Box,
  AspectRatio,
  Flex,
} from "@chakra-ui/react";
import { GetMovieGroupResponse, getMovieGroups } from "@app/services/groups/get-movie-groups";
import { useQuery } from "react-query";
import { getSession } from "next-auth/client";
import { withAuthRequired } from "@app/lib/with-auth-required";
import GroupCard from "@app/components/groups/GroupCard";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";

async function getAllMovieGroups(): Promise<GetMovieGroupResponse> {
  const res = await fetch("/api/groups/movies");

  if (!res.ok) {
    throw new Error("Unable to get all groups 😭.");
  }

  return await res.json();
}

const GroupsPage: NextPage = () => {
  const query = useQuery<GetMovieGroupResponse, Error>({
    queryKey: "movieGroups",
    queryFn: getAllMovieGroups,
  });

  if (query.status === "loading" || query.status === "idle") {
    return <Text>Loading...</Text>;
  }

  if (query.status === "error") {
    return <Text>Error...{query.error.message}</Text>;
  }

  return (
    <Stack spacing={8}>
      <Tabs isFitted>
        <TabList>
          <Tab>Movies</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Heading pt={8}>Movie Groups</Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SimpleGrid columns={2} spacingX={4} spacingY={4}>
        {query.data.map((group) => (
          <GroupCard
            key={group.id}
            emoji={group.emoji}
            imageBackdrop={group.imageBackdrop}
            movieCount={group.movieCount}
            name={group.name}
          />
        ))}

        <Stack
          border="solid"
          borderRadius="lg"
          justifyContent="center"
          alignItems="center"
          bgColor="primary.200"
          spacing={4}
        >
          <AddIcon w={12} h={12} />
          <Text fontSize="2xl"> Add a new group</Text>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

export default withAuthRequired(GroupsPage);
