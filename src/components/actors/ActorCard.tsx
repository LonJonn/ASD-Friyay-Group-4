import { StarIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import {
  AspectRatio,
  Badge,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/layout";
import NextLink from "next/link";

import { ActorResult, KnownFor } from "@app/typings";

interface ActorCardProps extends StackProps {
  actor: ActorResult;
}

export function ActorCard({ actor, ...props }: ActorCardProps) {
  return (
    <LinkBox
      as={Stack}
      rounded="lg"
      overflow="hidden"
      minW="64"
      flex="1"
      shadow="lg"
      transition="all ease-in-out 0.2s"
      _hover={{ transform: "scale(1.025)", shadow: "2xl" }}
      {...props}
    >
      <AspectRatio ratio={{ base: 2 / 1, md: 1 }}>
        <Image
          src={
            actor.profile_path == null
              ? "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
              : "https://image.tmdb.org/t/p/w500/" + actor.profile_path
          }
          alt={actor.name}
        />
      </AspectRatio>

      <Stack spacing={2} p={4}>
        <Heading size="md" isTruncated>
          <NextLink href={`/actors/${actor.id}`} passHref>
            <LinkOverlay>{actor.name}</LinkOverlay>
          </NextLink>
        </Heading>

        <Flex justifyContent="space-between" alignItems="center" gridGap={4}>
          <Text display="flex" alignItems="center" gridGap={1} fontSize="sm">
            <StarIcon color="orange.400" />
            Popularity: {formatRanking(actor.popularity)}
          </Text>

          <Badge colorScheme={actor.gender === 1 ? "pink" : "teal"}>
            {actor.gender === 1 ? "Female" : "Male"}
          </Badge>
        </Flex>

        <Text fontSize="xs" isTruncated>
          {getKnownFor(actor.known_for)}
        </Text>
      </Stack>
    </LinkBox>
  );
}

const { format: formatRanking } = new Intl.NumberFormat("en-AU", {
  maximumFractionDigits: 0,
});

export const getKnownFor = (knownFor: KnownFor[]) =>
  knownFor.map((kf) => kf.title ?? kf.name ?? kf.original_title ?? kf.original_name).join(", ");
