import * as userService from "@app/services/user";
import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";

type AllUsersProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const AllUsers: NextPage<AllUsersProps> = ({ users }) => (
  <Box>
    <Heading mb="4">Users</Heading>

    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          {user.firstName} | {user.email}
        </ListItem>
      ))}
    </List>
  </Box>
);

export const getServerSideProps: GetServerSideProps<{ users: userService.GetAllUsersResponse }> =
  async () => {
    const allUsers = await userService.getAllUsers();

    return {
      props: {
        users: allUsers,
      },
    };
  };

export default AllUsers;
