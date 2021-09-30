import { CloseIcon } from "@chakra-ui/icons";
import { AspectRatio, Heading, Image, Spacer, Stack, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DeleteGroupButton from "./DeleteGroupButton";

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
      as="button"
      borderWidth={2}
      borderRadius="lg"
      overflow="hidden"
      onClick={() => handleClick(groupId)}
      _hover={{ boxShadow: "2xl", transition: "0.5s" }}
      pos="relative"
    >
      <AspectRatio minW="xl" ratio={2} borderRadius="lg">
        <Image src={imageBackdrop} objectFit="cover" />
      </AspectRatio>

      <DeleteGroupButton groupId={groupId} name={name} emoji={emoji} movieCount={movieCount} />

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