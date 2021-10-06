import { GetActorGroupResponse } from "@app/pages/api/groups/actors/[id]";
import { GetMovieGroupResponse } from "@app/pages/api/groups/movies/[id]";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateGroupFunction } from "./AddToMovieGroup";

interface EditModalDisclosure {
  isOpen: boolean;
  onClose: () => void;
  currentGroupData: GetMovieGroupResponse | GetActorGroupResponse;
  type: string;
}

const EditGroupForm: React.FC<EditModalDisclosure> = ({
  isOpen,
  onClose,
  currentGroupData,
  type,
}) => {
  const [emoji, setEmoji] = useState(currentGroupData.emoji);
  const [name, setName] = useState(currentGroupData.name);
  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateGroupFunction, {
    onSuccess: () => {
      if (type === "actors") {
        queryClient.invalidateQueries(["actorGroup", currentGroupData.id]);
      }

      if (type === "movies") {
        queryClient.invalidateQueries(["movieGroup", currentGroupData.id]);
      }
    },
  });

  //should be using ReactHookForms for validation.
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (type === "actors") {
      updateMutation.mutate({
        type: "actors",
        actorGroupId: currentGroupData.id,
        actorGroupContents: { emoji: emoji, name: name },
      });
    }

    if (type === "movies") {
      updateMutation.mutate({
        type: "movies",
        movieGroupId: currentGroupData.id,
        movieGroupContents: { emoji: emoji, name: name },
      });
    }

    onClose();
  }

  return (
    <Modal blockScrollOnMount={false} size={"xl"} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Group</ModalHeader>

        <ModalBody>
          <Stack as="form" spacing={2} id="edit-form" onSubmit={onSubmit}>
            <FormControl id="emoji" isRequired>
              <FormLabel>Emoji</FormLabel>
              <Input
                value={emoji}
                onChange={(e) => {
                  setEmoji(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={() => {
              onClose();
            }}
            colorScheme="red"
          >
            Cancel
          </Button>
          <Button form="edit-form" type="submit">
            Add
          </Button>
        </ModalFooter>
        <ModalCloseButton
          onClick={() => {
            onClose();
          }}
        />
      </ModalContent>
    </Modal>
  );
};

export default EditGroupForm;
