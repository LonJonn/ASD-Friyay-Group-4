import { Heading, Spacer, Stack, Text } from "@chakra-ui/react";

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
      minH="xs"
    >
      <Heading size="3xl">{emoji}</Heading>
      <Heading size="4xl" color="whiteAlpha.900">
        {name}
      </Heading>
      <Spacer />
      <Heading color="whiteAlpha.900" size="lg">
        🎬 {movieCount}
      </Heading>
    </Stack>
  );
};

export default GroupCard;
