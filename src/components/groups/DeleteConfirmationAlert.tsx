import { DeleteMovieGroupBody } from "@app/pages/api/groups/movies/[id]";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import React, { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

interface DeleteConfirmationAlertProps {
  movieCount: number;
  onClose: () => void;
  isOpen: boolean;
  emoji: string;
  groupName: string;
  groupId: string;
}

async function deleteMutationFn(deleteMovieGroupArgs: DeleteMovieGroupBody) {
  const response = await fetch(`/api/groups/movies/${deleteMovieGroupArgs.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deleteMovieGroupArgs),
  });

  return response;
}

export const DeleteConfirmationAlert: React.FC<DeleteConfirmationAlertProps> = ({
  movieCount,
  onClose,
  isOpen,
  emoji,
  groupName,
  groupId,
}) => {
  const cancelRef = useRef(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation(deleteMutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries("movieGroups");
      router.push("/groups");
    },
  });

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete Group?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text>
            Are you sure you want to delete the {emoji} {groupName} group?
          </Text>
          <Text>All {movieCount.toString()} movie(s) in the group will be lost. </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={() => deleteMutation.mutate({ id: groupId })}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationAlert;
