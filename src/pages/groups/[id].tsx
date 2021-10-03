import { DeleteConfirmationAlert } from "@app/components/groups/DeleteConfirmationAlert";
import EditGroupForm from "@app/components/groups/EditGroupForm";
import MovieCard from "@app/components/groups/MovieCard";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { Box, Button, Heading, SimpleGrid, Stack, useDisclosure } from "@chakra-ui/react";
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
      <Stack direction="row" justifyContent="space-between" spacing={0}>
        <Box>
          <Heading fontSize="9xl">{movieGroupQuery.data.emoji}</Heading>
          <Heading color="teal.400" fontSize="9xl">
            {movieGroupQuery.data.name}
          </Heading>
        </Box>
        <Stack alignItems="right" justifyContent="flex-start" pt={4}>
          <Button onClick={onOpen}>edit</Button>
          <Button as={Stack} colorScheme="red" onClick={onOpenAlert}>
            delete
          </Button>
        </Stack>
      </Stack>
      <SimpleGrid columns={4} pt={8} spacing={4} justifyItems={"center"}>
        {movieGroupQuery.data.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} movieGroup={movieGroupQuery.data} />
        ))}
      </SimpleGrid>
      //off screen
      <EditGroupForm isOpen={isOpen} onClose={onClose} currentGroupData={movieGroupQuery.data} />
      <DeleteConfirmationAlert
        groupId={id}
        emoji={movieGroupQuery.data.emoji}
        groupName={movieGroupQuery.data.name}
        movieCount={movieGroupQuery.data.movieIds.length}
        onClose={onCloseAlert}
        isOpen={isOpenAlert}
      />
    </Stack>
  );
};

export default withAuthRequired(Group);
