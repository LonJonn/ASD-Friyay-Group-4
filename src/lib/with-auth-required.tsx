import { Button, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/client";
import React from "react";
import { FiLogIn } from "react-icons/fi";

export function withAuthRequired(Component: React.FC): React.FC {
  const Protected: React.FC = (props) => {
    const [session, loading] = useSession();

    if (session) {
      return <Component {...props} />;
    }

    /** Blank while loading */
    if (loading) {
      return null;
    }

    /** Show Auth Error Screen */
    return (
      <Stack align="center" spacing="8" mt="48">
        <Stack textAlign="center">
          <Heading fontSize="6xl" fontWeight="black">
            Uh oh... 😢
          </Heading>
          <Text lineHeight="tall">
            You must be signed in to see this page. Please sign in below.
          </Text>
        </Stack>

        <Button leftIcon={<Icon as={FiLogIn} />} onClick={() => signIn("auth0")}>
          Sign In
        </Button>
      </Stack>
    );
  };

  return Protected;
}
