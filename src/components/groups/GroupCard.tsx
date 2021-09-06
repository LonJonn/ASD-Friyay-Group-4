import { AspectRatio, Heading, Image, Spacer, Stack, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface IGroupCard {
  groupId: string;
  name: string;
  imageBackdrop: string;
  movieCount: number;
  emoji: string;
}

const GroupCard: React.FC<IGroupCard> = ({ groupId, name, imageBackdrop, movieCount, emoji }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/groups/${id}`);
  };

  return (
    <Box
      border="solid"
      borderRadius="lg"
      onClick={() => handleClick(groupId)}
      _hover={{ borderColor: "blue" }}
    >
      <AspectRatio minW="lg" ratio={2}>
        <Image objectFit="cover" src={imageBackdrop} />
      </AspectRatio>

      <Stack pos="relative" direction="row" alignItems="center" p={10} pt={12} spacing={0}>
        <Heading pos="absolute" top={0} transform="auto" translateY="-50%" fontSize="5xl">
          {emoji}
        </Heading>
        <Heading size="lg">{name}</Heading>
        <Spacer />
        <Text fontSize="lg">{movieCount} 🎬</Text>
      </Stack>
    </Box>
  );
};

export default GroupCard;
