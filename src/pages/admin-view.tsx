import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getSession } from "next-auth/client";

import { withAuthRequired } from "@app/lib/with-auth-required";
import { getAllUsers, GetAllUsersResponse } from "@app/services/user";

type AllUsersProps = Required<InferGetServerSidePropsType<typeof getServerSideProps>>;

const AllUsers: NextPage<AllUsersProps> = ({ users }) => (
  <Box>
  <a class="button" id="new-user-button">Create new user</a>
    <Heading mb="4">Hello Admin!</Heading>
    <p>You are logged in as an admin.</p>
    <form id="seach-div">
    <p class="search-text">Search Users</p>
    <label><input type="text" name="name" id="admin-search-text"/></label>
    <input type="submit" value="Submit" id="admin-search"/>
    </form>
    <List>
      {users.map((user) => (
        <ListItem key={user.id} class="list-item-users">
          {user.firstName} | {user.email}
          <button class="button button-outline table-button">Delete User</button>
          <button class="button button-outline  table-button">Edit User</button>
        </ListItem>

      ))}
    </List>

    <Heading mb="4" class="hide">You are not logged in as an admin</Heading>

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
