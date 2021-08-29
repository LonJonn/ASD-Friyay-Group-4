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
      <Heading>Home</Heading>

      <NextLink href="/all-users-client" passHref>
        <Link
          onMouseOver={() => {
            queryClient.prefetchQuery("users", getAllUsers, { staleTime: 15000 });
          }}
        >
          To all users client
        </Link>
      </NextLink>

      <Text
        fontSize="xl"
        sx={{
          ...(loading && {
            color: "blue.500",
            fontWeight: "bold",
          }),
        }}
      >
        {JSON.stringify(loading)}
      </Text>

      <Text as="pre" overflowX="auto">
        {JSON.stringify(session, null, 2)}
      </Text>
    </Stack>
  );
};

export default Home;
