import { ActorCard } from "@app/components/actors/ActorCard";
import { SummarisedActorGroup } from "@app/services/groups/actor/get-actor-groups";
import { Box, Image, AspectRatio, Stack, Heading, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import DeleteGroupButton from "../DeleteGroupButton";

export interface IActorGroupCard {
  actorGroup: SummarisedActorGroup;
}

const ActorGroupCard: React.FC<IActorGroupCard> = ({ actorGroup }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/groups/actor/${id}`);
  };

  return (
    <Box
      borderWidth={2}
      borderRadius="lg"
      overflow="hidden"
      onClick={() => handleClick(actorGroup.id)}
      _hover={{ boxShadow: "2xl", transition: "0.5s" }}
      pos="relative"
    >
      <AspectRatio ratio={1 / 1.1} minW="sm" borderRadius="lg">
        <Image src={actorGroup.imageBackdrop} objectFit="cover" />
      </AspectRatio>

      <DeleteGroupButton
        groupId={actorGroup.id}
        name={actorGroup.name}
        emoji={actorGroup.emoji}
        itemCount={actorGroup.actorIds.length}
        type={"actors"}
      />

      <Stack pos="relative" direction="row" alignItems="center" p={8} pt={10} spacing={0}>
        <Heading pos="absolute" top={0} transform="auto" translateY="-50%" fontSize="5xl">
          {actorGroup.emoji}
        </Heading>
        <Heading size="md">{actorGroup.name.toUpperCase()}</Heading>
        <Spacer />
        <Heading fontSize="xl" color="teal.400">
          {actorGroup.actorIds.length} 🎭
        </Heading>
      </Stack>
    </Box>
  );
};

export default ActorGroupCard;
