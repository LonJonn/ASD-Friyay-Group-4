import EditGroupForm from "@app/components/groups/EditGroupForm";
import { withAuthRequired } from "@app/lib/with-auth-required";
import {
  AspectRatio,
  Box,
  Button,
  Image,
  SimpleGrid,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteMovieGroupBody, GetMovieGroupResponse } from "../api/groups/movies/[id]";

async function getMovieGroup(movieGroupID: string): Promise<GetMovieGroupResponse> {
  return fetch(`/api/groups/movies/${movieGroupID}`).then((res) => res.json());
}

const Group: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  //-------------Query---------------------
  const queryClient = useQueryClient();
  const movieGroupQuery = useQuery({
    queryKey: ["movieGroup", id],
    queryFn: () => getMovieGroup(id as string),
  });

  //--------------Mutations---------------

  const deleteMutation = useMutation(async (deletedMovieGroup: DeleteMovieGroupBody) => {
    const response = await fetch(`/api/groups/movies/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deletedMovieGroup),
    });
    queryClient.invalidateQueries("movieGroups");
    router.push("/groups");
    return response;
  });

  //-------------------Modal--------------

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Button
        as={Stack}
        colorScheme="red"
        onClick={() => {
          deleteMutation.mutate({
            id: id,
          });
        }}
      >
        delete group
      </Button>
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
