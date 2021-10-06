import type { NextPage } from "next";
import NextLink from "next/link";
import { useSession } from "next-auth/client";
import { Heading, Link, Stack, Text } from "@chakra-ui/react";
import { useQueryClient } from "react-query";

import { getAllUsers } from "./all-users-client";

const Home: NextPage = () => {
  const [session, loading] = useSession();
  const queryClient = useQueryClient();

  return (
    <Stack direction="column" align="start" spacing={4}>
      <Heading>Error! You're not logged in as an admin!</Heading>

      <NextLink href="./" passHref>
        <Link
          onMouseOver={() => {
            queryClient.prefetchQuery("users", getAllUsers, { staleTime: 15000 });
          }}
        >
          Click here to return to the homepage
        </Link>
      </NextLink>

    </Stack>
  );
};

export default Home;
