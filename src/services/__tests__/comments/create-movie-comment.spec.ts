import { createMovieComment } from "@app/services/comment/create-movie-comment";
import { mocked } from "ts-jest/utils";
import { db } from "@app/lib/db";

import sampleMovieComments from "./sampleCreateComment.json";

jest.mock("@app/lib/db", () => ({
  db: { comment: { create: jest.fn() } },
}));

test("Create a new movie comment", async () => {
  mocked(db.comment.create).mockResolvedValueOnce(sampleMovieComments as any);

  const createComment = await createMovieComment({
    movieId: "550988",
    text: "Glory to Los Pollos Hermanos 👴👴",
    user: {
      connect: {
        id: "612af05800b431e00009d011",
      },
    },
  });

  expect(createComment.userId).toBe("612af05800b431e00009d011");
  expect(createComment.text).toBe("Glory to Los Pollos Hermanos 👴👴");
  expect(createComment.movieId).toBe("550988");
});
