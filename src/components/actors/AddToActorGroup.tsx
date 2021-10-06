import { GetActorGroupsResponse } from "@app/pages/api/groups/actors";
import { getAllActorGroups } from "@app/pages/groups";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateGroupFunction } from "../groups/AddToMovieGroup";

export const AddToActorGroup: React.FC = () => {
  const router = useRouter();
  const actorId = router.query.id as string;
  const queryClient = useQueryClient();

  const actorGroupsQuery = useQuery<GetActorGroupsResponse, Error>({
    queryKey: "actorGroups",
    queryFn: getAllActorGroups,
  });

  const updateMutation = useMutation(updateGroupFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["actorGroups"]);
    },
  });

  if (actorGroupsQuery.isLoading) return <Text>Loading...</Text>;
  if (!actorGroupsQuery.data) return <>Lumfao</>;

  const availableGroups = actorGroupsQuery.data.filter(
    (actorGroup) => !actorGroup.actorIds.includes(actorId)
  );

  return (
    <Stack>
      {availableGroups.length === 0 && <Button disabled>No Available Groups</Button>}

      {availableGroups.length > 0 && (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Add to Actor Group
          </MenuButton>

          <MenuList>
            {availableGroups.map((actorGroup) => {
              const actorGroupContents = { actorIds: [...actorGroup.actorIds, actorId] };
              return (
                <MenuItem
                  key={actorGroup.id}
                  onClick={() =>
                    updateMutation.mutate({
                      type: "actors",
                      actorGroupId: actorGroup.id,
                      actorGroupContents: actorGroupContents,
                    })
                  }
                >
                  {actorGroup.emoji} {actorGroup.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
    </Stack>
  );
};
