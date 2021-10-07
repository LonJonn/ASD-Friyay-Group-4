import { db } from "@app/lib/db";
import { getActorGroup } from "@app/services/groups/actor/get-actor-group";
import { mocked } from "ts-jest/utils";
import sampleActorGroup from "./sampleActorGroup.json";

jest.mock("@app/lib/db", () => ({
  db: {
    actorGroup: {
      findUnique: jest.fn(),
    },
  },
}));

describe("getMovieGroups", () => {
  test("getMovieGroups should return a single Movie", async () => {
    mocked(db.actorGroup.findUnique).mockResolvedValueOnce(sampleActorGroup as any);
    const actorGroup = await getActorGroup({ id: "615d505b007d932600d7abea" });

    expect(actorGroup!.name).toEqual("Squiddy gamers");
    expect(actorGroup!.emoji).toEqual("🦑😁");
    expect(actorGroup!.actorIds.length).toEqual(5);
  });
});
