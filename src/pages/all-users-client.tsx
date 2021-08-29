import { NextPage } from "next";
import { useQuery } from "react-query";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

import { withAuthRequired } from "@app/lib/with-auth-required";
import { GetAllUsersResponse } from "@app/services/user";

export async function getAllUsers(): Promise<GetAllUsersResponse> {
  const res = await fetch("/api/users");

  if (!res.ok) {
    throw new Error("Unable to get all users.");
  }

  return await res.json();
}

const AllUsersClient: NextPage = () => {
  const query = useQuery<GetAllUsersResponse, Error>({
    queryKey: "users",
    queryFn: getAllUsers,
    staleTime: 15000,
  });

  if (query.isIdle || query.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (query.isError) {
    return <Text>Something went wrong: {query.error.message}</Text>;
  }

  return (
    <Box>
      <Heading mb="4">Users</Heading>

      <List>
        {query.data.map((user) => (
          <ListItem key={user.id}>
            {user.firstName} | {user.email}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default withAuthRequired(AllUsersClient);
