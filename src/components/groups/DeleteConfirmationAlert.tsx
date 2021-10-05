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
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

interface DeleteConfirmationAlertProps {
  itemCount: number;
  onClose: () => void;
  isOpen: boolean;
  emoji: string;
  groupName: string;
  groupId: string;
  type: string;
}

interface DeleteMutationFnArgs extends DeleteMovieGroupBody {
  type?: string;
}

//used for both Actor and MovieGroup but uses only DeleteMovieGroupBody type as they are the same!
async function deleteMutationFn(deleteGroupArgs: DeleteMutationFnArgs) {
  const type = deleteGroupArgs.type;
  delete deleteGroupArgs.type;
  const response = await fetch(`/api/groups/${type}/${deleteGroupArgs.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deleteGroupArgs),
  });

  return response;
}

export const DeleteConfirmationAlert: React.FC<DeleteConfirmationAlertProps> = ({
  itemCount,
  onClose,
  isOpen,
  emoji,
  groupName,
  groupId,
  type,
}) => {
  const cancelRef = useRef(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteMutationFn, {
    onSuccess: () => {
      onClose();
      if (type === "movies") {
        queryClient.invalidateQueries("movieGroups");
      }
      if (type === "actors") {
        queryClient.invalidateQueries("actorGroups");
      }
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
          {/*Conditional HERE*/}
          {type === "movies" && (
            <Text>All {itemCount.toString()} movie(s) in the group will be lost. </Text>
          )}
          {type === "actors" && (
            <Text>All {itemCount.toString()} actor(s) in the group will be lost. </Text>
          )}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => deleteMutation.mutate({ id: groupId, type: type })}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationAlert;
