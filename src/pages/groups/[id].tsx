import type { NextPage } from "next";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Group: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      Will Contain A Single Group
      {id}
    </div>
  );
};

export default Group;
