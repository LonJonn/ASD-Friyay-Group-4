import { getActor } from "@app/services/actor/get-actor";
import { mocked } from "ts-jest/utils";
import sampleData from "./sample-data.json";

// Tell Jest to mock node-fetch
jest.mock("node-fetch", () => {
  return jest.fn();
});

// Set node-fetch to be used globally during execution of the test
global.fetch = require("node-fetch");

// Clear existing mocks
beforeEach(() => {
  mocked(fetch).mockClear();
});

test("it gets the correct actor by their id", async () => {
  mocked(fetch).mockImplementation((): Promise<any> => {
    return Promise.resolve({
      json() {
        return Promise.resolve(sampleData);
      },
    });
  });

  // Get the actor with id 287 (Brad Pitt)
  const actor = await getActor({ id: "287" });

  // Check the returned actor has the correct name
  expect(actor.name).toBe("Brad Pitt");

  // Check the id is the same
  expect(actor.id).toBe(287);

  // Check the actors known for department
  expect(actor.known_for_department).toBe("Acting");
});
