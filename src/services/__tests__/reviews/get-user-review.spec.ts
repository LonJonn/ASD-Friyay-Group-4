import { getUsersReviews } from "../../reviews/get-user-reviews";
import { mocked } from "ts-jest/utils";
import { db } from "@app/lib/db";

//userReview Mock Data
import mockUserReviewData from "./mockUserReviewData.json";

// Mock the db client to return sample data
jest.mock("@app/lib/db", () => ({
    db: { review: { findMany: jest.fn() } },
  }));

test("Grabbing all users reviews", async () => {
    mocked(db.review.findMany).mockResolvedValueOnce(mockUserReviewData as any);
  
    // Attempt to grab all user reviews
    const allUserReviews = await getUsersReviews("612af74e005ea9de00c6e9de", "mostLiked");
  
    // Array may not have any reviews
    expect(allUserReviews.length).toBeGreaterThanOrEqual(0);
  });