import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getSession } from "next-auth/client";

import { withAuthRequired } from "@app/lib/with-auth-required";
import { getAllUsers, GetAllUsersResponse } from "@app/services/user";

type AllUsersProps = Required<InferGetServerSidePropsType<typeof getServerSideProps>>;

const AllUsers: NextPage<AllUsersProps> = ({ users }) => (
  <Box>
    <Heading mb="4">Admin View!</Heading>
    <p>You are logged in as an admin.</p>
    <button>Create new user</button>

    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          {user.firstName} | {user.email}
          <button>Edit User</button>
          <button>Delete User</button>
        </ListItem>

      ))}
    </List>

    <Heading mb="4">You are not logged in as an admin</Heading>

  </Box>
);

export const getServerSideProps: GetServerSideProps<{ users?: GetAllUsersResponse }> = async (
  ctx
) => {
  // Check if user is logged in, if not, return out
  const session = await getSession(ctx);
  if (!session) {
    return {
      props: {},
      // redirect: {
      //   destination: "/login",
      //   permanent: false,
      // },
    };
  }

  const users = await getAllUsers();

  return {
    props: {
      session, // We return the session here so that the client doesn't have to request it again
      users,
    },
  };
};

export default withAuthRequired(AllUsers);
