import type { NextPage } from "next";
import { Stack, Image, AspectRatio } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { withAuthRequired } from "@app/lib/with-auth-required";

const Group: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

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
