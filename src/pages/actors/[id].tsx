import { NextPage } from "next";
import { useRouter } from "next/router";

import { useGetActorByIDQuery } from "@app/hooks/actor/useGetActorByIDQuery";
import React, { useState } from "react";
import {
  AspectRatio,
  Heading,
  Stack,
  Image,
  Text,
  Grid,
  Badge,
  Box,
  Flex,
  Button,
  Divider,
  Collapse,
} from "@chakra-ui/react";
import { useActorCreditsQuery, Cast } from "@app/hooks/actor/useActorCreditsQuery";
import { AddToActorGroup } from "@app/components/actors/AddToActorGroup";

const ActorsPage: NextPage = () => {
  const id = useRouter().query.id as string;
  const detailsQuery = useGetActorByIDQuery(id);
  const creditsQuery = useActorCreditsQuery(id);

  console.log(creditsQuery);

  const [isShowMore, setIsShowMore] = useState(false);

  if (detailsQuery.status !== "success" && creditsQuery.status !== "success") {
    return null;
  }

  if (!detailsQuery.data || !creditsQuery.data) {
    return <Heading mt={16}>We cant find the actor 🤔</Heading>;
  }

  return (
    <Flex mt={8} alignItems="start">
      <Image
        src={
          detailsQuery.data.profile_path == null
            ? "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
            : "https://image.tmdb.org/t/p/w500/" + detailsQuery.data.profile_path
        }
        alt={detailsQuery.data.name}
        rounded="lg"
        shadow="lg"
        w={1 / 3}
        objectFit="cover"
        style={{ aspectRatio: "3 / 4" }}
      />

      <Stack spacing={8} w={2 / 3} pl={8}>
        {/* Name */}
        <Heading size="2xl">{detailsQuery.data.name}</Heading>

        {/* Meta */}
        <Flex
          flexWrap="wrap"
          gridColumnGap={12}
          gridRowGap={4}
          p={4}
          borderWidth="thin"
          borderColor="gray.200"
          rounded="md"
        >
          <Box>
            <Heading size="sm">Gender</Heading>
            <Badge colorScheme={detailsQuery.data.gender === 1 ? "pink" : "teal"}>
              {detailsQuery.data.gender === 1 ? "Female" : "Male"}
            </Badge>
          </Box>

          <Box>
            <Heading size="sm">Known for</Heading>
            <Text>{detailsQuery.data.known_for_department}</Text>
          </Box>

          <Box>
            <Heading size="sm">Birthday</Heading>
            <Text>{formatDateTime(new Date(detailsQuery.data.birthday))}</Text>
          </Box>

          <Box>
            <Heading size="sm">Place of birth</Heading>
            <Text>{detailsQuery.data.place_of_birth}</Text>
          </Box>

          <Box>
            <Heading size="sm">Known credits</Heading>
            <Text>{creditsQuery.data?.cast.length}</Text>
          </Box>
        </Flex>

        <AddToActorGroup />

        {/* Biography */}
        <Stack>
          <Heading size="md" fontWeight="medium">
            Biography
          </Heading>

          <Collapse startingHeight={96} in={isShowMore}>
            <Text whiteSpace="pre-line">{detailsQuery.data.biography}</Text>
          </Collapse>

          <Button
            variant="link"
            alignSelf="end"
            color="teal"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            Show {isShowMore ? "less" : "more"}
          </Button>
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Heading size="md" fontWeight="medium">
            Appears in
          </Heading>

          <Stack maxW="100%" overflowX="scroll" direction="row" alignItems="start" spacing={8}>
            {creditsQuery.data.cast.slice(0, 10).map((cast) => (
              <CreditPreview cast={cast} key={cast.id} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ActorsPage;

const { format: formatDateTime } = new Intl.DateTimeFormat("en-AU", {});

interface CreditPreviewProps {
  cast: Cast;
}

function CreditPreview({ cast }: CreditPreviewProps) {
  return (
    <Box w="32">
      <Image
        key={cast.title}
        src={
          cast.backdrop_path == null
            ? "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
            : "https://image.tmdb.org/t/p/w500/" + cast.backdrop_path
        }
        alt={cast.title}
        maxW={32}
        style={{ aspectRatio: "3 / 4" }}
        objectFit="cover"
        rounded="md"
        shadow="lg"
      />

      <Text fontSize="xs" isTruncated mt={2}>
        {cast.title}
      </Text>
    </Box>
  );
}
