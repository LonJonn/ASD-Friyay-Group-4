import { ReviewDeleteBody } from "@app/pages/api/reviews";
import { useDisclosure } from "@chakra-ui/hooks";
import { CloseIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { Button, Text, Spacer } from "@chakra-ui/react";
import { useRef } from "react";
import { useQueryClient } from "react-query";
import { Review } from "@prisma/client";

export interface DeleteReviewBtn {
  review: Review;
}

const DeleteReviewButton: React.FC<DeleteReviewBtn> = ({ review }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const queryClient = useQueryClient();

  async function deleteReviewRequest() {
    const requestBody: ReviewDeleteBody = { id: review.id };
    const response = await fetch("/api/reviews", {
      method: "DELETE",
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
      <Button
        colorScheme={"red"}
        width={"100px"}
        onClick={(e) => {
          onOpen();
          e.stopPropagation();
        }}
      > Delete</Button>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Review?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text>Are you sure you want to delete the {review.title} ?</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="teal" ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Spacer/>
            <Button colorScheme="red" ml={3} onClick={deleteReviewRequest}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteReviewButton;
