import EditGroupForm from "@app/components/groups/EditGroupForm";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { Button, Stack, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GetMovieGroupResponse,
  DeleteMovieGroupBody,
  UpdateMovieGroupBody,
} from "../api/groups/movies/[id]";

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

  const queryClient = useQueryClient();

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
      <Stack maxW="sm">
        <pre>{JSON.stringify(movieGroupQuery.data, null, 2)}</pre>

        <Button onClick={onOpen}>edit group</Button>

        <Button
          colorScheme="red"
          onClick={() => {
            deleteMutation.mutate({
              id: id,
            });
          }}
        >
          delete group
        </Button>
      </Stack>
      <EditGroupForm isOpen={isOpen} onClose={onClose} currentGroupData={movieGroupQuery.data} />
    </Stack>
  );
};

export default withAuthRequired(Group);
