import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";

export interface CommentDeleteModalProps {
  onConfirm: () => void;
}

export default function CommentDeleteModal({ onConfirm }: CommentDeleteModalProps) {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this comment permanently?</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" size="sm" onClick={onConfirm}>
            DELETE
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
