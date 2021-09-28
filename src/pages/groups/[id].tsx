import { withAuthRequired } from "@app/lib/with-auth-required";
import { Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GetMovieGroupResponse } from "../api/groups/movies/[id]";

async function getMovieGroup(movieGroupID: string): Promise<GetMovieGroupResponse> {
  return fetch(`/api/groups/movies/${movieGroupID}`).then((res) => res.json());
}

const Group: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const movieGroupQuery = useQuery({
    queryKey: ["movieGroup", id],
    queryFn: () => getMovieGroup(id as string),
  });

  if (movieGroupQuery.isLoading || movieGroupQuery.isIdle) {
    return <>lumfao</>;
  }

  if (movieGroupQuery.isError) {
    return <>lumfao</>;
  }

  return (
    <Stack>
      <Stack direction="row" maxW="sm">
        <pre>{JSON.stringify(movieGroupQuery.data, null, 2)}</pre>
      </Stack>
    </Stack>
  );
};

export default withAuthRequired(Group);
