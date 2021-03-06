import { TransformedMovieGroup } from "@app/services/groups";
import { CloseIcon } from "@chakra-ui/icons";
import { AspectRatio, Heading, Image, Spacer, Stack, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DeleteGroupButton from "./DeleteGroupButton";

export interface IGroupCard {
  group: TransformedMovieGroup;
}

const GroupCard: React.FC<IGroupCard> = ({ group }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/groups/movie/${id}`);
  };

  return (
    <Box
      as="button"
      borderWidth={2}
      borderRadius="lg"
      overflow="hidden"
      onClick={() => handleClick(group.id)}
      _hover={{ transform: "scale(1.02)", boxShadow: "2xl", transition: "0.5s" }}
      pos="relative"
    >
      <AspectRatio minW="xl" ratio={2} borderRadius="lg">
        <Image src={group.imageBackdrop} objectFit="cover" />
      </AspectRatio>

      <DeleteGroupButton
        groupId={group.id}
        name={group.name}
        emoji={group.emoji}
        itemCount={group.movieIds.length}
        type={"movies"}
      />

      <Stack pos="relative" direction="row" alignItems="center" p={8} pt={10} spacing={0}>
        <Heading pos="absolute" top={0} transform="auto" translateY="-50%" fontSize="5xl">
          {group.emoji}
        </Heading>
        <Heading size="lg">{group.name.toUpperCase()}</Heading>
        <Spacer />
        <Heading fontSize="2xl" color="teal.400">
          {group.movieIds.length} 🎞
        </Heading>
      </Stack>
    </Box>
  );
};

export default GroupCard;
