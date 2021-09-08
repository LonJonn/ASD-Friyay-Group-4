import { NewMovieGroup } from "@app/services/groups";
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
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQueryClient } from "react-query";

export interface CreateModalDiclosure {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupForm: React.FC<CreateModalDiclosure> = ({ isOpen, onClose }) => {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  //should be using ReactHookForms for validation.
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const requestBody: NewMovieGroup = {
      emoji,
      name,
    };

    //useMutation from reactQuery
    const response = await fetch("/api/groups/movies", {
      method: "POST",
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
      <Modal blockScrollOnMount={false} size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Group</ModalHeader>

          <ModalBody>
            <Stack as="form" spacing={2} id="create-form" onSubmit={onSubmit}>
              <FormControl id="emoji" isRequired>
                <FormLabel>Emoji</FormLabel>
                <Input
                  placeholder="e.g. 😍👺"
                  value={emoji}
                  onChange={(e) => {
                    setEmoji(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl id="emoji" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="e.g. Favourites"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} colorScheme="red">
              Cancel
            </Button>
            <Button form="create-form" type="submit">
              Add
            </Button>
          </ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupForm;
