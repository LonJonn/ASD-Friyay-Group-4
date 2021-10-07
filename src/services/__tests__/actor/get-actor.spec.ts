import { getActor } from "@app/services/actor/get-actor";
import { mocked } from "ts-jest/utils";
import mockData from "./mock-data.json";

// Tell Jest to mock global fetch
global.fetch = jest.fn();

test("it gets the correct actor by their id", async () => {
  mocked(fetch).mockImplementationOnce((): Promise<any> => {
    return Promise.resolve({
      json() {
        return Promise.resolve(mockData);
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
