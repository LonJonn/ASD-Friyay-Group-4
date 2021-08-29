import type { NextPage } from "next";
import { Heading, Stack, Text } from "@chakra-ui/react";

export interface IGroupCard {
  name: String;
  imageBackdrop: String;
  movieCount: number;
  emoji: String;
}

const GroupCard: React.FC<IGroupCard> = ({ name, imageBackdrop, movieCount, emoji }) => {
  return (
    <Stack
      border="solid"
      p={6}
      spacing={4}
      backgroundImage={`${imageBackdrop}`}
      backgroundSize="cover"
      maxW="3xl"
    >
      <Heading size="3xl">{emoji}</Heading>
      <Heading color="whiteAlpha.900">{name}</Heading>
      <Heading color="whiteAlpha.900" size="md">
        🎬 {movieCount}
      </Heading>
    </Stack>
  );
};

export default GroupCard;
