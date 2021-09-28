import { withAuthRequired } from "@app/lib/with-auth-required";
import { Button, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
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
  const queryClient = useQueryClient();

  const movieGroupQuery = useQuery({
    queryKey: ["movieGroup", id],
    queryFn: () => getMovieGroup(id as string),
  });

  const updateMutation = useMutation(async (updatedMovieGroup: UpdateMovieGroupBody) => {
    const response = await fetch(`/api/groups/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovieGroup),
    });
    queryClient.invalidateQueries(["movieGroup", id]);
    return response;
  });

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

  if (movieGroupQuery.isLoading || movieGroupQuery.isIdle) {
    return <>lumfao</>;
  }

  if (movieGroupQuery.isError) {
    return <>lumfao</>;
  }

  return (
    <Stack>
      <Stack maxW="sm">
        <pre>{JSON.stringify(movieGroupQuery.data, null, 2)}</pre>
        <Button
          onClick={() => {
            updateMutation.mutate({
              where: { id: id },
              data: { emoji: "🥶", name: "ICCE" },
            });
          }}
        >
          Ligma to edit
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            deleteMutation.mutate({
              id: id,
            });
          }}
        >
          Ligma to delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default withAuthRequired(Group);
