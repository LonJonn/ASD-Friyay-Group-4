import { GetActorGroupResponse } from "@app/pages/api/groups/actors/[id]";
import { Actor } from "@app/typings";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateGroupFunction } from "../AddToMovieGroup";

interface IActorCard {
  actor: Actor;
  actorGroup: GetActorGroupResponse;
}

export const ActorCard: React.FC<IActorCard> = ({ actor, actorGroup }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  //using the update group function, send an uppdated object to the API and invalidate current cached data on success.
  const updateMutation = useMutation(updateGroupFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["actorGroup", actorGroup.id]);
    },
  });

  return (
    <Box
      overflow="hidden"
      maxH="445px"
      _hover={{ transform: "scale(1.02)", transition: "0.5s" }}
      onClick={() => router.push(`/actors/${actor.id}`)}
    >
      <Image
        src={"https://image.tmdb.org/t/p/w500/" + actor.profile_path}
        objectFit="cover"
        position="relative"
      />

      {/*trigger to delete the given actor from its group using the useMutation hook above*/}
      <DeleteIcon
        as="button"
        w={5}
        h={5}
        pos="absolute"
        top={0}
        right={0}
        transform="auto"
        translateY="50%"
        translateX="-50%"
        color="gray.100"
        _hover={{ color: "red.300", transition: "0.5s" }}
        onClick={(e) => {
          const updatedActorIds = actorGroup.actorIds.filter((id) => id != actor.id.toString());
          updateMutation.mutate({
            type: "actors",
            actorGroupId: actorGroup.id,
            actorGroupContents: { actorIds: updatedActorIds },
          });
          e.stopPropagation();
        }}
      />
    </Box>
  );
};
