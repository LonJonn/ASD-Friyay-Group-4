import { User } from "@prisma/client";

import { db } from "@app/lib/db";

/**
 * This is the custom response type of the service action.
 *
 * This is used when our service needs to respond with a shape that doesn't match our DB's.
 * E.g. We might to compute the user's first name.
 */

interface UserWithFirstName extends Pick<User, "id" | "name" | "email"> {
  firstName: string;
}

export type GetAllUsersResponse = UserWithFirstName[];

export async function getAllUsers(): Promise<GetAllUsersResponse> {
  const allUsers = await db.user.findMany();

  // Compute first name
  const usersWithFirstName = allUsers.map((user): UserWithFirstName => {
    const firstName = user.name?.split(".")[0] || "unnamed";

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      firstName,
    };
  });

  return usersWithFirstName;
}
