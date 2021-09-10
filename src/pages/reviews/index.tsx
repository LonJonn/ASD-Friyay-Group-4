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
} from "@chakra-ui/react";

async function getUsersReviews(): Promise<GetUsersReviewsResponse> {
  const res = await fetch("/api/reviews");

  if (!res.ok) {
    throw new Error("Unable to get reviews😭");
  }

  return await res.json();
}

const MovieReviewsPage: NextPage = () => {
  const query = useQuery<GetUsersReviewsResponse, Error>({
    queryKey: "reviews",
    queryFn: getUsersReviews,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (query.status === "loading" || query.status === "idle") {
    return <Text>Loading...</Text>;
  }

  if (query.status === "error") {
    return <Text>Error...{query.error.message}</Text>;
  }

  return(
    <Stack>
      <HStack spacing={5}>
        <Heading py={4} paddingBottom={3}>User Movie Reviews</Heading>
        <Spacer/>
        <Button colorScheme={"teal"} size={"md"} onClick={onOpen}>
          Add Review
        </Button>
      </HStack>

      <List>
      {query.data.map((review) => (
        <ReviewCards
          key={review.id} 
          title={review.title} 
          description={review.text} 
          userName={""} 
          ratings={review.ratings} 
          upVotes={0} 
          downVotes={0}           
        />
       ))}
      </List>

      <CreateReviewForm isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default withAuthRequired(MovieReviewsPage);
