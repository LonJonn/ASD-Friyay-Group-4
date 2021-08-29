import { AspectRatio, Heading, Image, Spacer, Stack, Text, Box } from "@chakra-ui/react";

export interface IGroupCard {
  name: string;
  imageBackdrop: string;
  movieCount: number;
  emoji: string;
}

const GroupCard: React.FC<IGroupCard> = ({ name, imageBackdrop, movieCount, emoji }) => {
  return (
    <Box border="solid" borderRadius="lg">
      <AspectRatio minW="xl" ratio={2}>
        <Image objectFit="cover" src={imageBackdrop} />
      </AspectRatio>

      <Stack pos="relative" direction="row" alignItems="center" p={10} pt={12} spacing={0}>
        <Heading pos="absolute" top={0} transform="auto" translateY="-50%" fontSize="5xl">
          {emoji}
        </Heading>
        <Heading size="xl">{name}</Heading>
        <Spacer />
        <Text fontSize="xl">{movieCount} 🎬</Text>
      </Stack>
    </Box>
  );
};

export default GroupCard;
