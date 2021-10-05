import DeleteConfirmationAlert from "@app/components/groups/DeleteConfirmationAlert";
import EditGroupForm from "@app/components/groups/EditGroupForm";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { GetActorGroupResponse } from "@app/pages/api/groups/actors/[id]";
import { Box, Button, Heading, SimpleGrid, Stack, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

async function getActorGroup(actorGroupID: string): Promise<GetActorGroupResponse> {
  return fetch(`/api/groups/actors/${actorGroupID}`).then((res) => res.json());
}

const ActorGroupPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const actorGroupQuery = useQuery({
    queryKey: ["actorGroup", id],
    queryFn: () => getActorGroup(id),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();

  if (actorGroupQuery.isLoading || actorGroupQuery.isIdle) {
    return <>Loading</>;
  }

  if (actorGroupQuery.isError) {
    return <>Error!</>;
  }

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" spacing={0}>
        <Box>
          <Heading fontSize="7xl">{actorGroupQuery.data.emoji}</Heading>
          <Heading fontSize="7xl">{actorGroupQuery.data.name.toUpperCase()}</Heading>
        </Box>
        <Stack alignItems="right" justifyContent="flex-start" pt={4}>
          <Button onClick={onOpen}>edit</Button>
          <Button as={Stack} colorScheme="red" onClick={onOpenAlert}>
            delete
          </Button>
        </Stack>
      </Stack>
      <SimpleGrid columns={4} pt={8} spacing={4} justifyItems={"center"}>
        {actorGroupQuery.data.actors.map((actor) => (
          <div key={actor?.id}>{actor?.name}</div>
        ))}
      </SimpleGrid>
      <EditGroupForm
        isOpen={isOpen}
        onClose={onClose}
        currentGroupData={actorGroupQuery.data}
        type="actors"
      />
      <DeleteConfirmationAlert
        groupId={id}
        emoji={actorGroupQuery.data.emoji}
        groupName={actorGroupQuery.data.name}
        itemCount={actorGroupQuery.data.actorIds.length}
        onClose={onCloseAlert}
        isOpen={isOpenAlert}
        type="actors"
      />
    </Stack>
  );
};

export default withAuthRequired(ActorGroupPage);
