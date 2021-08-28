import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import { Heading, Stack, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <Stack direction="column" spacing="2">
      <Heading>Home</Heading>

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
