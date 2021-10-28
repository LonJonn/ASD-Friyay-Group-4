import { MovieGroupPostBody } from "@app/pages/api/groups/movies";
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

export interface CreateModalDisclosure {
  isOpen: boolean;
  onClose: () => void;
  apiEndPoint: string;
  queryInvalidationKey: string;
}

const CreateGroupForm: React.FC<CreateModalDisclosure> = ({
  isOpen,
  onClose,
  apiEndPoint,
  queryInvalidationKey,
}) => {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  //should be using ReactHookForms for validation.
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const requestBody: MovieGroupPostBody = {
      emoji,
      name,
    };

    //useMutation from reactQuery should be used
    const response = await fetch(`/api/groups/${apiEndPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    queryClient.invalidateQueries(`${queryInvalidationKey}`);

    setEmoji("");
    setName("");

    onClose();
  }

  return (
    <>
      <Modal blockScrollOnMount={false} size={"xl"} isOpen={isOpen} onClose={onClose} isCentered>
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

              <FormControl id="title" isRequired>
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
            <Button
              mr={3}
              onClick={() => {
                onClose();
                setEmoji("");
                setName("");
              }}
              colorScheme="red"
            >
              Cancel
            </Button>
            <Button form="create-form" type="submit">
              Add
            </Button>
          </ModalFooter>
          <ModalCloseButton
            onClick={() => {
              onClose();
              setEmoji("");
              setName("");
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupForm;
