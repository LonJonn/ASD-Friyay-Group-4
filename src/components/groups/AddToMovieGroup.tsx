import { GetMovieGroupsResponse } from "@app/pages/api/groups/movies";
import { UpdateMovieGroupBody } from "@app/pages/api/groups/movies/[id]";
import { getAllMovieGroups } from "@app/pages/groups";
import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface UpdateGroupArgs {
  movieGroupId?: string;
  movieGroupContents?: UpdateMovieGroupBody;
  actorGroupId?: string;
  actorGroupContents?: UpdateMovieGroupBody;
  type?: string;
}

export async function updateGroupFunction(updateGroupArgs: UpdateGroupArgs) {
  const type = updateGroupArgs.type;
  delete updateGroupArgs.type;

  var response;

  if (type === "movies") {
    response = await fetch(`/api/groups/movies/${updateGroupArgs.movieGroupId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateGroupArgs.movieGroupContents),
    });
  }

  if (type === "actors") {
    response = await fetch(`/api/groups/actors/${updateGroupArgs.actorGroupId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateGroupArgs.actorGroupContents),
    });
  }

  return response;
}

export const AddToMovieGroup: React.FC = () => {
  const router = useRouter();
  const movieId = router.query.id as string;
  const queryClient = useQueryClient();

  const movieGroupsQuery = useQuery<GetMovieGroupsResponse, Error>({
    queryKey: "movieGroups",
    queryFn: getAllMovieGroups,
  });

  const updateMutation = useMutation(updateGroupFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["movieGroups"]);
    },
  });

  if (movieGroupsQuery.isLoading) return <Button>Loading...</Button>;
  if (!movieGroupsQuery.data) return <>Lumfao</>;

  const availableGroups = movieGroupsQuery.data.filter(
    (movieGroup) => !movieGroup.movieIds.includes(movieId)
  );

  return (
    <Stack pb={4}>
      {availableGroups.length === 0 && <Button disabled>No Available Groups</Button>}

      {availableGroups.length > 0 && (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Add to Movie Group
          </MenuButton>

          <MenuList>
            {availableGroups.map((movieGroup) => {
              const movieGroupContents = { movieIds: [...movieGroup.movieIds, movieId] };
              return (
                <MenuItem
                  key={movieGroup.id}
                  onClick={() =>
                    updateMutation.mutate({
                      type: "movies",
                      movieGroupId: movieGroup.id,
                      movieGroupContents: movieGroupContents,
                    })
                  }
                >
                  {movieGroup.emoji} {movieGroup.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
    </Stack>
  );
};
