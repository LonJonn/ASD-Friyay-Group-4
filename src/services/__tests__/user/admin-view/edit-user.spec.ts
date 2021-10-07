import { db } from "@app/lib/db";
import { editUser } from "@app/services/admin-view/edit-user";
import { mocked } from "ts-jest/utils";

// Mock the db client to return sample data
jest.mock("@app/lib/db", () => ({
  db: { user: { update: jest.fn() } },
}));

const d = new Date("2015-03-25T12:00:00Z");

test("should update a users name and email ", async () => {
  // create user variable
  const user = {
    id: "1",
    name: "Rich",
    email: "hello@prisma.io",
    emailVerified: null,
    image: null,
    createdAt: d,
    updatedAt: d,
  };

  // create userEdit variable
  const userEdit = {
    id: "1",
    name: "Rich Haines",
    email: "HelloWorld@prisma.io",
    emailVerified: null,
    image: null,
    createdAt: d,
    updatedAt: d,
  };

  const oldEmail = String(user.email);

  const newName = String(userEdit.name);
  const newEmail = String(userEdit.email);

  const id1 = String(newName + "," + newEmail + "," + oldEmail);

  // mock update user result

  mocked(db.user.update).mockResolvedValueOnce(editUser as any);

  const newUser = await editUser(id1);

  //ensure that the edited user is returned
  expect(newUser.name).toBeDefined();
});
