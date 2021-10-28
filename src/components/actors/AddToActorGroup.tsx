import { GetActorGroupsResponse } from "@app/pages/api/groups/actors";
import { getAllActorGroups } from "@app/pages/groups";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateGroupFunction } from "../groups/AddToMovieGroup";
import CreateGroupForm from "../groups/CreateGroupForm";

export const AddToActorGroup: React.FC = () => {
  const router = useRouter();
  const actorId = router.query.id as string;
  const queryClient = useQueryClient();

  const { isOpen: isOpenAG, onOpen: onOpenAG, onClose: onCloseAG } = useDisclosure();

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
      {availableGroups.length === 0 && (
        <Stack direction="row">
          <Button disabled flexGrow={1}>
            No Available Groups
          </Button>
          <IconButton icon={<AddIcon />} onClick={onOpenAG} aria-label="Add group" />
        </Stack>
      )}

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
            <MenuItem onClick={onOpenAG} justifyContent="center">
              <AddIcon />
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      <CreateGroupForm
        isOpen={isOpenAG}
        onClose={onCloseAG}
        apiEndPoint="actors"
        queryInvalidationKey="actorGroups"
      />
    </Stack>
  );
};
