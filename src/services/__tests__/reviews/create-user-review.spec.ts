import { createReview } from "@app/services/reviews/create-review";
import { mocked } from "ts-jest/utils";
import { db } from "@app/lib/db";

//createUserReview Mock Data
import userCreateReviewData from "./userCreateReviewData.json";

jest.mock("@app/lib/db", () => ({
    db: { review: { create: jest.fn() } },
  }));

test("Created new user review", async () => {
    mocked(db.review.create).mockResolvedValueOnce(userCreateReviewData as any);

    // Attempt to create user reviews
    const createUserReviews = await createReview({
        data: {
          title:"Movie Sucks" ,
          text: "Movie was too grusomeee not for the faint hearted.",
          ratings: 1,
          movieId: "",
          likes: 0,
          dislikes: 0,
          ownerId: "612af74e005ea9de00c6e9de",
        },
      });

    // Check the review title matches
    expect(createUserReviews.title).toBe("Movie Sucks");

    // Check the review text matches
    expect(createUserReviews.text).toBe("Movie was too grusomeee not for the faint hearted.");

    // Check the review rating matches
    expect(createUserReviews.ratings).toBe(1);

    // Check the review likes matches
    expect(createUserReviews.likes).toBe(0);

    // Check the review disLikes matches
    expect(createUserReviews.dislikes).toBe(0);
});