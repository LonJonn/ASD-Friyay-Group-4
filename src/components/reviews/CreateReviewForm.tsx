import { ReviewGroupPostBody } from "@app/pages/api/reviews";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
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
  Select,
  Spacer,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export interface CreateReviewModal {
  isOpen: boolean;
  onClose: () => void;
}

const CreateReviewForm: React.FC<CreateReviewModal> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ratings, setRating] = useState("");
  const queryClient = useQueryClient();

  //should be using ReactHookForms for validation.
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTitle("");
    setText("");
    setRating("");

    const requestBody: ReviewGroupPostBody = {
      title,
      text,
      ratings: parseInt(ratings),
    };

    //Should useMutation from reactQuery
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    queryClient.invalidateQueries("reviews");
    console.log(response);

    onClose();
  }

  return (
    <>
      <Modal blockScrollOnMount={false} size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Review</ModalHeader>

          <ModalBody>
            <Stack as="form" spacing={2} id="create-form" onSubmit={onSubmit}>
              <FormControl id="emoji" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Awesome Movie! 😍"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="This movie is Awesome!"
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
                    setRating(e.target.value);
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
            <Button mr={3} onClick= {() => {setRating(""); setText(""); setTitle(""); onClose()}} colorScheme="red">
              Cancel
            </Button>
            <Spacer />
            <Button form="create-form" type="submit" colorScheme="teal">
              Add
            </Button>
          </ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateReviewForm;
