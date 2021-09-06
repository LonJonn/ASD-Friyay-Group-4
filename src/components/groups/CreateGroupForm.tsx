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
import React from "react";

export interface CreateModalDiclosure {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupForm: React.FC<CreateModalDiclosure> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal blockScrollOnMount={false} size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Group</ModalHeader>

          <ModalBody>
            <Stack spacing={2}>
              <FormControl id="emoji" isRequired>
                <FormLabel>Emoji</FormLabel>
                <Input placeholder="Emoji" />
              </FormControl>

              <FormControl id="emoji" isRequired>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Favourites" />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} colorScheme="red">
              Cancel
            </Button>
            <Button>Add</Button>
          </ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupForm;
