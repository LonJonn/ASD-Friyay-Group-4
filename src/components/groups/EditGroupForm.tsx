import { GetMovieGroupResponse, UpdateMovieGroupBody } from "@app/pages/api/groups/movies/[id]";
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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface EditModalDisclosure {
  isOpen: boolean;
  onClose: () => void;
  currentGroupData: GetMovieGroupResponse;
}

const EditGroupForm: React.FC<EditModalDisclosure> = ({ isOpen, onClose, currentGroupData }) => {
  const [emoji, setEmoji] = useState(currentGroupData.emoji);
  const [name, setName] = useState(currentGroupData.name);
  const queryClient = useQueryClient();

  const updateMutation = useMutation(async (updatedMovieGroup: UpdateMovieGroupBody) => {
    const response = await fetch(`/api/groups/movies/${currentGroupData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovieGroup),
    });
    queryClient.invalidateQueries(["movieGroup", currentGroupData.id]);
    return response;
  });

  //should be using ReactHookForms for validation.
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    updateMutation.mutate({
      where: { id: currentGroupData.id },
      data: { emoji: emoji, name: name },
    });
    queryClient.invalidateQueries("movieGroups");
    onClose();
  }

  return (
    <Modal blockScrollOnMount={false} size={"xl"} isOpen={isOpen} onClose={onClose}>
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
