import ActorGroupCard from "@app/components/groups/actor/ActorGroupCard";
import CreateGroupForm from "@app/components/groups/CreateGroupForm";
import GroupCard from "@app/components/groups/GroupCard";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { GetMovieGroupsResponse } from "@app/pages/api/groups/movies";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import { GetActorGroupsResponse } from "../api/groups/actors";

//Query Functions
export async function getAllMovieGroups(): Promise<GetMovieGroupsResponse> {
  const res = await fetch("/api/groups/movies");
  if (!res.ok) {
    throw new Error("Unable to get all movie groups 😭.");
  }
  return await res.json();
}

export async function getAllActorGroups(): Promise<GetActorGroupsResponse> {
  const res = await fetch("/api/groups/actors");
  if (!res.ok) {
    throw new Error("Unable to get all actor groups 😭.");
  }
  return await res.json();
}

const GroupsPage: NextPage = () => {
  const movieGroupsQuery = useQuery<GetMovieGroupsResponse, Error>({
    queryKey: "movieGroups",
    queryFn: getAllMovieGroups,
  });

  const actorGroupsQuery = useQuery<GetActorGroupsResponse, Error>({
    queryKey: "actorGroups",
    queryFn: getAllActorGroups,
  });

  const { isOpen: isOpenMG, onOpen: onOpenMG, onClose: onCloseMG } = useDisclosure();
  const { isOpen: isOpenAG, onOpen: onOpenAG, onClose: onCloseAG } = useDisclosure();

  if (
    movieGroupsQuery.status === "loading" ||
    movieGroupsQuery.status === "idle" ||
    actorGroupsQuery.status === "loading" ||
    actorGroupsQuery.status === "idle"
  ) {
    return <Text>Loading...</Text>;
  }

  if (movieGroupsQuery.status === "error") {
    return <Text>Error...{movieGroupsQuery.error.message}</Text>;
  }

  if (actorGroupsQuery.status === "error") {
    return <Text>Error...{actorGroupsQuery.error.message}</Text>;
  }

  return (
    <Stack>
      <Tabs isFitted>
        <TabList>
          <Tab>Movies</Tab>
          <Tab>Actors</Tab>
        </TabList>

        <TabPanels>
          {/*--------------------------Movies Page--------------------------*/}
          <TabPanel>
            <Stack spacing={0} m={6} display="inline-flex" flexGrow={0}>
              <Heading mb={10} fontSize="4xl">
                Movie Groups
              </Heading>

              <Button leftIcon={<AddIcon />} onClick={onOpenMG}>
                New Group
              </Button>
            </Stack>
            <Box>
              <SimpleGrid columns={2} spacingY={6} justifyItems="center">
                {movieGroupsQuery.data.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </SimpleGrid>
            </Box>

            <CreateGroupForm
              isOpen={isOpenMG}
              onClose={onCloseMG}
              apiEndPoint="movies"
              queryInvalidationKey="movieGroups"
            />
          </TabPanel>

          {/*--------------------------Actors Page--------------------------*/}
          <TabPanel>
            <Stack spacing={0} m={6} display="inline-flex" flexGrow={0}>
              <Heading mb={10} fontSize="4xl">
                Actor Groups
              </Heading>

              <Button leftIcon={<AddIcon />} onClick={onOpenAG} display="inline-flex">
                New Group
              </Button>
            </Stack>

            <Box>
              <SimpleGrid columns={3} spacingY={4} justifyItems="center">
                {actorGroupsQuery.data.map((actorGroup) => (
                  <ActorGroupCard actorGroup={actorGroup} key={actorGroup.id} />
                ))}
              </SimpleGrid>
            </Box>

            <CreateGroupForm
              isOpen={isOpenAG}
              onClose={onCloseAG}
              apiEndPoint="actors"
              queryInvalidationKey="actorGroups"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default withAuthRequired(GroupsPage);
