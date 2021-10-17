import { db } from "@app/lib/db";
import { getMovieGroup } from "@app/services/groups";
import { mocked } from "ts-jest/utils";
import sampleMovieGroup from "./sampleMovieGroup.json";

jest.mock("@app/lib/db", () => ({
  db: {
    movieGroup: {
      findUnique: jest.fn(),
    },
  },
}));

describe("getMovieGroups", () => {
  test("getMovieGroups should return a single Movie", async () => {
    mocked(db.movieGroup.findUnique).mockResolvedValueOnce(sampleMovieGroup as any);
    const movieGroup = await getMovieGroup({ id: "615d505b007d932600d7abea" });

    expect(movieGroup!.name).toEqual("Classics");
    expect(movieGroup!.emoji).toEqual("🥇");
    expect(movieGroup!.movieIds.length).toEqual(3);
  });
});
