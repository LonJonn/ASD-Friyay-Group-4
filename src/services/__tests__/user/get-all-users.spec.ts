import { getAllUsers } from "../../user/get-all-users";
import { mocked } from "ts-jest/utils";
import { db } from "@app/lib/db";

// Mock Data
import mockData from "./mock-data.json";

// Mock the db client to return sample data
jest.mock("@app/lib/db", () => ({
  db: { user: { findMany: jest.fn() } },
}));

test("It grabs all users", async () => {
  mocked(db.user.findMany).mockResolvedValueOnce(mockData as any);

  // Attempt to grab all users (which returns the sample data from our mock above)
  const allUsers = await getAllUsers();

  // Array should have at least one user
  expect(allUsers.length).toBeGreaterThan(0);
});

test("It computes first names for users", async () => {
  mocked(db.user.findMany).mockResolvedValueOnce(mockData as any);

  // Get all the users and pick a random one from the array
  const allUsers = await getAllUsers();
  const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

  // Check if the user contains a firstName field which we computed in our service
  expect(randomUser.firstName).toBeDefined();
});
