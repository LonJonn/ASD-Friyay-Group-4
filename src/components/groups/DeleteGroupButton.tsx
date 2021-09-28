import { MovieGroup } from ".prisma/client";
import { DeleteMovieGroupBody } from "@app/pages/api/groups/movies/[id]";
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
import { Button, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

export interface IDeleteGroupButton {
  groupId: string;
  emoji: string;
  name: string;
  movieCount: number;
}

const DeleteGroupButton: React.FC<IDeleteGroupButton> = ({ groupId, emoji, name, movieCount }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const queryClient = useQueryClient();

  //useMutation plox!!! later
  async function deleteMovieRequest() {
    const requestBody: DeleteMovieGroupBody = { id: groupId };
    const response = await fetch(`api/groups/movies/${groupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    queryClient.invalidateQueries("movieGroups");
    console.log(response);
    onClose();
  }

  return (
    <>
      <CloseIcon
        as="button"
        w={5}
        h={5}
        pos="absolute"
        top={0}
        right={0}
        transform="auto"
        translateY="80%"
        translateX="-80%"
        color="whiteAlpha.900"
        borderWidth={2}
        borderColor="blackAlpha.100"
        _hover={{ color: "red.300", transition: "0.5s" }}
        onClick={(e) => {
          onOpen();
          e.stopPropagation();
        }}
      />

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
              Are you sure you want to delete the {emoji} {name} group?
            </Text>
            <Text>All {movieCount.toString()} movie(s) in the group will be lost. </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={deleteMovieRequest}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteGroupButton;
