import GroupCard from "@app/components/groups/GroupCard";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { GetMovieGroupResponse } from "@app/services/groups/get-movie-groups";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Button,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery } from "react-query";

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
            <Stack direction="row" alignItems="center">
              <Heading p={8}>Movie Groups</Heading>
              <Spacer />
              <Button leftIcon={<AddIcon />}>Add new</Button>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Box>
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
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default withAuthRequired(GroupsPage);
