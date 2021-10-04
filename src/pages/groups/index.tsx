import CreateGroupForm from "@app/components/groups/CreateGroupForm";
import GroupCard from "@app/components/groups/GroupCard";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { GetMovieGroupsResponse } from "@app/pages/api/groups/movies";
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
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery } from "react-query";

export async function getAllMovieGroups(): Promise<GetMovieGroupsResponse> {
  const res = await fetch("/api/groups/movies");

  if (!res.ok) {
    throw new Error("Unable to get all groups 😭.");
  }

  return await res.json();
}

const GroupsPage: NextPage = () => {
  const query = useQuery<GetMovieGroupsResponse, Error>({
    queryKey: "movieGroups",
    queryFn: getAllMovieGroups,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Stack spacing={0} display="inline-flex" mx={6} mt={6}>
              <Heading mb={10} fontSize="4xl">
                Movie Groups
              </Heading>
              <Button leftIcon={<AddIcon />} onClick={onOpen} display="inline-flex">
                New Group
              </Button>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Box>
        <SimpleGrid columns={2} spacingY={10} justifyItems="center">
          {query.data.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </SimpleGrid>
      </Box>

      <CreateGroupForm isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default withAuthRequired(GroupsPage);
