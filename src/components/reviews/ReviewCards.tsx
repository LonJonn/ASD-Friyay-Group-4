import { Heading, Stack, HStack, Text, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import DeleteReviewButton from "./DeleteReviewButton";
import EditReviewForm from "@app/components/reviews/updateReviewButton";
import { Review } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { updateReviewFunc } from "./updateReviewButton";
import React, { useState } from "react";

export interface ReviewCard {
  review: Review;
}

const UserReviewCard: React.FC<ReviewCard> = ({ review}) => {
  
  const queryClient = useQueryClient();
  const updateMutation = useMutation(updateReviewFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });

  // adds an upVote to review
  async function onClickUpVote(){
    updateMutation.mutate({id: review.id, likes: review.likes + 1});
    queryClient.invalidateQueries("reviews");
  }

  // add a downVote to review
  async function onClickDownVote(){
    updateMutation.mutate({id: review.id, dislikes: review.dislikes + 1});
    queryClient.invalidateQueries("reviews");
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack pos="relative">
      <HStack paddingTop={10}>
        <Heading size="lg" paddingBottom="0.5rem">
          {review.title}
        </Heading>
        <p> {review.ratings}/5 ⭐</p>
        <Spacer />
        <HStack>
          <Button id="upVote" colorScheme="teal" variant="ghost" onClick={onClickUpVote}>
            👍
          </Button>
          <p> {review.likes}</p>
        </HStack>
        <HStack>
          <Button id="downVote" colorScheme="teal" variant="ghost" onClick={onClickDownVote}>
            👎
          </Button>
          <p> {review.dislikes}</p>
        </HStack>
      </HStack>
      <p>
        🧙 {review.createdAt}
      </p>
      <Text>{review.text}</Text>
      <HStack>
        <Button colorScheme={"teal"} width={"120px"} onClick={onOpen}>
          Edit Review
        </Button>
        <DeleteReviewButton review={review} />
      </HStack>

      <EditReviewForm isOpen={isOpen} onClose={onClose} currentReviewData={review} />
    </Stack>
  );
};

export default UserReviewCard;