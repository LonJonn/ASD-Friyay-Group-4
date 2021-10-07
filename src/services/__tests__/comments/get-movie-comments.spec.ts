import { db } from "@app/lib/db";
import { getMovieComments } from "@app/services/comment";
import { mocked } from "ts-jest/utils";
import sampleMovieComments from "./sampleMovieComments.json";

jest.mock("@app/lib/db", () => ({
  db: {
    comment: {
      findMany: jest.fn(),
    },
  },
}));

describe("getMovieComments", () => {
  test("getMovieComments should return an array of movie comments", async () => {
    mocked(db.comment.findMany).mockResolvedValue(sampleMovieComments as any);
    const movieComments = await getMovieComments("550988");
    expect(movieComments[0]!.id).toEqual("615ec4650074d58f005ebddc");
    expect(movieComments[1]!.text).toEqual("Glory to Los Pollos Hermanos 👴👴");
    expect(movieComments[2]!.reported).toEqual(false);
  });
});
