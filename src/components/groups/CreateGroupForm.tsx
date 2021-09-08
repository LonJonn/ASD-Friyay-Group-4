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

export interface CreateModalDiclosure {
  isOpen: boolean;
  onClose: () => void;
}

export interface NewMovieGroup {
  emoji: string;
  name: string;
}

const CreateGroupForm: React.FC<CreateModalDiclosure> = ({ isOpen, onClose }) => {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");

  //should be using ReactHookForms for validation.
  async function onSubmit() {
    const requestBody: NewMovieGroup = {
      emoji: emoji,
      name: name,
    };

    const response = await fetch("/api/groups/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log(response);
  }

  return (
    <>
      <Modal blockScrollOnMount={false} size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Group</ModalHeader>

          <ModalBody>
            <Stack spacing={2}>
              <form id="create-form" onSubmit={onSubmit}>
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
              </form>
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
