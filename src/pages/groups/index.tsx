import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Stack, Heading, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import * as movieGroupService from "@app/services/groups";
import { useQuery } from "react-query";
import { getSession } from "next-auth/client";
import { withAuthRequired } from "@app/lib/with-auth-required";
import GroupCard from "@app/components/groups/GroupCard";

type GroupsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const GroupsPage: NextPage<GroupsPageProps> = ({ movieGroups }) => {
  // const query = useQuery({
  //   queryKey: "movieGroups",
  //   queryFn: () => movieGroupService.getMovieGroups("612ae75400a9b2d900299b5e"),
  //   initialData: movieGroups,
  // });

  // if (query.status === "loading" || query.status === "idle") {
  //   return <Text>Loading...</Text>;
  // }

  // if (query.status === "error") {
  //   return <Text>Error...{query.error}</Text>;
  // }

  return (
    <Stack spacing={8}>
      {/* <Tab>
        <TabList>
          <Tab>Movies</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading>Movie Groups</Heading>
          </TabPanel>
        </TabPanels>
      </Tab> */}

      <Stack spacing={4}>
        {movieGroups.map((group) => (
          <GroupCard
            key={group.id}
            emoji={group.emoji}
            imageBackdrop={group.imageBackdrop}
            movieCount={group.movieCount}
            name={group.name}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps<{
  movieGroups: movieGroupService.GetMovieGroupResponse;
}> = async (ctx) => {
  const session = await getSession(ctx);
  const movieGroups = await movieGroupService.getMovieGroups("612ae75400a9b2d900299b5e");

  return {
    props: {
      movieGroups,
    },
  };
};

export default withAuthRequired(GroupsPage);
