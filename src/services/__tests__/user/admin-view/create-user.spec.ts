import { db } from "@app/lib/db";
import { createUser } from "@app/services/admin-view/create-user";
import { mocked } from "ts-jest/utils";
// import { prismaMock } from "../../../../../singleton";

const d = new Date("2015-03-25T12:00:00Z");

// Mock the db client to return sample data
jest.mock("@app/lib/db", () => ({
  db: { user: { create: jest.fn() } },
}));

test("should create new user ", async () => {
  //create user variable
  const user = {
    id: "1",
    name: "Rich",
    email: "hello@prisma.io",
    emailVerified: null,
    image: null,
    createdAt: d,
    updatedAt: d,
  };

  const name = String(user.name);
  const email = String(user.email);
  const id1 = String(name + "," + email);

  //'create user' mock value in mock db
  // prismaMock.user.create.mockResolvedValue(user);
  // prismaMock.$disconnect();
  mocked(db.user.create).mockResolvedValueOnce(user);

  //pass through createUser function in services and check it returns the same user
  const newUser = await createUser(id1);

  expect(newUser.name).toBeDefined();
});
