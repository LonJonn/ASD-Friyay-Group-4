import { DeleteConfirmationAlert } from "@app/components/groups/DeleteConfirmationAlert";
import EditGroupForm from "@app/components/groups/EditGroupForm";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { Box, Button, Image, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { GetMovieGroupResponse } from "../api/groups/movies/[id]";

async function getMovieGroup(movieGroupID: string): Promise<GetMovieGroupResponse> {
  return fetch(`/api/groups/movies/${movieGroupID}`).then((res) => res.json());
}

const Group: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  //-------------Query---------------------
  const movieGroupQuery = useQuery({
    queryKey: ["movieGroup", id],
    queryFn: () => getMovieGroup(id as string),
  });

  //-------------------Modal  & Delete Disclosures--------------

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();

  if (movieGroupQuery.isLoading || movieGroupQuery.isIdle) {
    return <>Loading</>;
  }

  if (movieGroupQuery.isError) {
    return <>Error!</>;
  }

  return (
    <Stack>
      <Stack spacing={0}>
        <Text align="center" fontSize="9xl">
          {movieGroupQuery.data.emoji}
        </Text>
        <Text align="center" fontSize="9xl">
          {movieGroupQuery.data.name}
        </Text>
      </Stack>
      <Button onClick={onOpen}>edit group</Button>
      <Button as={Stack} colorScheme="red" onClick={onOpenAlert}>
        delete group
      </Button>

      <DeleteConfirmationAlert
        groupId={id}
        emoji={movieGroupQuery.data.emoji}
        groupName={movieGroupQuery.data.name}
        movieCount={movieGroupQuery.data.movieIds.length}
        onClose={onCloseAlert}
        isOpen={isOpenAlert}
      />

      <Stack pt={8}>
        <SimpleGrid columns={2} spacingY={10} justifyItems={"center"}>
          {movieGroupQuery.data.movies.map((movie) => (
            <Box overflow="hidden" maxH="741px">
              <Image
                src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                objectFit="cover"
              />
            </Box>
          ))}
        </SimpleGrid>
      </Stack>

      <EditGroupForm isOpen={isOpen} onClose={onClose} currentGroupData={movieGroupQuery.data} />
    </Stack>
  );
};

export default withAuthRequired(Group);
