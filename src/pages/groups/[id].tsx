import { MovieGroup } from ".prisma/client";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { Image, Stack, useQuery } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

// async function getMovieGroup(movieGroupID:string):Promise<MovieGroupResponse>{

// }

const Group: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // const query = useQuery<MovieGroup, Error>({
  //   queryKey: "movieGroup",
  //   queryFn: ()=>getMovieGroup(id as string),
  // });

  return (
    <Stack>
      <Stack direction="row" maxW="sm">
        <Image src="https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg" />
      </Stack>
      {id}
    </Stack>
  );
};

export default withAuthRequired(Group);
