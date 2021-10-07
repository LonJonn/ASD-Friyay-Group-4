import ReviewCards from "@app/components/reviews/ReviewCards";
import CreateReviewForm from "@app/components/reviews/CreateReviewForm";
import { withAuthRequired } from "@app/lib/with-auth-required";
import { GetUsersReviewsResponse } from "@app/services/reviews/get-user-reviews";
import { NextPage } from "next";
import { useQuery } from "react-query";
import {
  Heading,
  Stack,
  HStack,
  Text,
  Button,
  Spacer,
  List,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

async function getUsersReviews(sortType: string): Promise<GetUsersReviewsResponse>{
  const res = await fetch(`/api/reviews?sort=${sortType}`);

  if (!res.ok) {
    throw new Error("Unable to get reviews😭");
  }

  return await res.json();
}

const MovieReviewsPage: NextPage = () => {
  const [sortType, setSortType] = useState("mostRecent");
  
  const query = useQuery<GetUsersReviewsResponse, Error>({
    queryKey: ["reviews", sortType],
    queryFn: () => getUsersReviews(sortType),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (query.status === "loading" || query.status === "idle") {
    return <Text>Loading...</Text>;
  }

  if (query.status === "error") {
    return <Text>Error...{query.error.message}</Text>;
  }

  return (
    <Stack>
      <HStack spacing={5}>
        <Heading py={4} paddingBottom={3}>
          My Movie Reviews
        </Heading>
        <Spacer />
        <Select
          width={"200px"}
          color={"teal"}
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="mostRecent">Sort By Recent</option>
          <option value="mostLiked">Sort By Most Liked</option>
          <option value="mostDisliked">Sort By Most Disliked</option>
        </Select>
        <Button colorScheme={"teal"} size={"md"} onClick={onOpen}>
          Add Review
        </Button>
      </HStack>

      {/* Review Cards Displayed in UI */}
      <List id="userReview">
        {query.data?.map((review) => (
          <ReviewCards key={review.id} review={review} />
        ))}
      </List>

      <CreateReviewForm isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default withAuthRequired(MovieReviewsPage);
