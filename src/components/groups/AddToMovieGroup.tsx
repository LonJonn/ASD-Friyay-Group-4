import { GetMovieGroupsResponse } from "@app/pages/api/groups/movies";
import { getAllMovieGroups } from "@app/pages/groups";
import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

export const AddToMovieGroup: React.FC = () => {
  const router = useRouter();
  const movieId = router.query.id as string;

  const movieGroupsQuery = useQuery<GetMovieGroupsResponse, Error>({
    queryKey: "movieGroups",
    queryFn: getAllMovieGroups,
  });

  if (movieGroupsQuery.isLoading) return <Button>Loading...</Button>;

  return (
    <Stack pb={4}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Add to Movie Group
        </MenuButton>
        <MenuList>
          {movieGroupsQuery.data?.map((movieGroup) => {
            return <MenuItem>{`${movieGroup.emoji}  ${movieGroup.name}`}</MenuItem>;
          })}
        </MenuList>
      </Menu>
    </Stack>
  );
};
