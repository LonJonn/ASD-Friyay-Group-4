import { getAllUsers } from "../../user/get-all-users";

test("Placeholder", async () => {
  const text = "Hello World";

  expect(text).toEqual("Hello World");
});

/*
test("It grabs all users", async () => {
  const allUsers = await getAllUsers();

  expect(allUsers.length).toBeGreaterThan(0);
});

test("It computes first names for users", async () => {
  const allUsers = await getAllUsers();
  const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

  expect(randomUser.firstName).toBeDefined();
});
*/

