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
import DeleteConfirmationAlert from "./DeleteConfirmationAlert";

export interface IDeleteGroupButton {
  groupId: string;
  emoji: string;
  name: string;
  itemCount: number;
  type: string;
}

const DeleteGroupButton: React.FC<IDeleteGroupButton> = ({
  groupId,
  emoji,
  name,
  itemCount,
  type,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

      <DeleteConfirmationAlert
        groupId={groupId}
        emoji={emoji}
        groupName={name}
        itemCount={itemCount}
        onClose={onClose}
        isOpen={isOpen}
        type={type}
      />
    </>
  );
};

export default DeleteGroupButton;
