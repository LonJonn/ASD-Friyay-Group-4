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

export interface CommentReportModalProps {
  onConfirm: () => void;
}

export default function CommentReportModal({ onConfirm }: CommentReportModalProps) {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to report this comment?</ModalBody>
        <ModalBody fontSize={"sm"}>
          A reported comment will remtain and be manually reviewed by an admin
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" size="sm" onClick={onConfirm}>
            REPORT
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
