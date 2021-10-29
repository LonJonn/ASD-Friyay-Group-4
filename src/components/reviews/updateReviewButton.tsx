import { UpdateReviewBody } from "@app/pages/api/reviews";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Spacer,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Review } from ".prisma/client";

interface EditReviewModalDisclosure {
  isOpen: boolean;
  onClose: () => void;
  currentReviewData: Review;
}

interface UpdateReviewBodyMutation extends UpdateReviewBody {
  id?: string;
}

//create function that updates the likes and dislikes of a movie Review
export async function updateReviewFunc(updatedUserReview: UpdateReviewBodyMutation) {
  const id = updatedUserReview.id;
  delete updatedUserReview.id;

  const response = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUserReview),
  });

  return response;
}

const EditReviewForm: React.FC<EditReviewModalDisclosure> = ({
  isOpen,
  onClose,
  currentReviewData,
}) => {
  const [title, setTitle] = useState(currentReviewData.title);
  const [text, setText] = useState(currentReviewData.text);
  const [ratings, setRating] = useState(currentReviewData.ratings);
  const queryClient = useQueryClient();

  const updateMutation = useMutation(async (updatedUserReview: UpdateReviewBody) => {
    const response = await fetch(`/api/reviews/${currentReviewData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserReview),
    });
    queryClient.invalidateQueries("reviews");
    return response;
  });

  //should be using ReactHookForms for validation.
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    updateMutation.mutate({ title: title, text: text, ratings: ratings });
    queryClient.invalidateQueries("reviews");
    onClose();
  }

  return (
    <>
      <Modal blockScrollOnMount={false} size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Review</ModalHeader>

          <ModalBody>
            <Stack as="form" spacing={2} id="edit-form" onSubmit={onSubmit}>
              <FormControl id="emoji" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </FormControl>

              <FormLabel id="rating">Rating</FormLabel>
              <Select
                placeholder = "Select rating out of 5"
                color={"teal"}
                value={ratings}
                onChange={(e) => {
                  setRating(parseInt(e.target.value));
                }}
                isRequired
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Select>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} colorScheme="red">
              Cancel
            </Button>
            <Spacer />
            <Button form="edit-form" type="submit" colorScheme="teal">
              Update
            </Button>
          </ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditReviewForm;
