import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import GroupCard, { IGroupCard } from "@app/components/groups/GroupCard";
import { useState } from "react";
import { Text, Stack, Heading } from "@chakra-ui/react";
import * as movieGroupService from "@app/services/groups";
import { useQuery } from "react-query";

type GroupsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const GroupsPage: NextPage<GroupsPageProps> = ({ movieGroups }) => {
  //   const query = useQuery({
  //     queryKey: "movieGroups",
  //     queryFn: () => movieGroupService.getMovieGroups("612ae75400a9b2d900299b5e"),
  //   });

  //   if (query.status === "loading") {
  //     return <></>;
  //   }
  //   if (query.status === "idle") {
  //     return <></>;
  //   }

  return (
    <Stack spacing={8}>
      <Heading>Media Groups</Heading>
      <Stack spacing={4}>
        {movieGroups.map((group) => (
          <GroupCard
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
}> = async () => {
  const movieGroups = await movieGroupService.getMovieGroups("612ae75400a9b2d900299b5e");

  return {
    props: {
      movieGroups,
    },
  };
};

export default GroupsPage;
