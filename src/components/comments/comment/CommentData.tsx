import { Button } from "@chakra-ui/button";
import { useEditableControls } from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import {
  ButtonGroup,
  IconButton,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import React from "react";
import Prisma from "@prisma/client";
import { useSession } from "next-auth/client";

export interface CommentDataProps {
  user: Prisma.User;
  text: string;
  createdAt: Date;
  onEdit: (newText: string) => void;
}

export default function CommentData({ user, text, createdAt, onEdit }: CommentDataProps) {
  const [currentUser] = useSession();

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup>
        <IconButton
          aria-label="submit-button"
          icon={<CheckIcon />}
          variant="ghost"
          size="sm"
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="cancel-button"
          icon={<CloseIcon />}
          variant="ghost"
          size="sm"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex>
        {user.id === currentUser?.uid && (
          <IconButton
            variant="ghost"
            aria-label="edit-button"
            icon={<EditIcon />}
            size="sm"
            {...getEditButtonProps()}
          />
        )}
      </Flex>
    );
  }

  return (
    <Stack direction="column" maxW={700} w="full">
      <Box>
        <Text fontWeight="medium" fontSize="lg" as="span">
          {user.name}
        </Text>
        <Text color="gray.700" fontSize="sm" ml={2} as="span">
          {formatDate(new Date(createdAt))}
        </Text>
      </Box>

      <Editable defaultValue={text} fontSize="md" isPreviewFocusable={false} onSubmit={onEdit}>
        <EditablePreview />
        <EditableInput />
        <Box sx={{ h: 2 }} />
        <EditableControls />
      </Editable>
    </Stack>
  );
}

const { format: formatDate } = new Intl.DateTimeFormat("en-AU", { dateStyle: "medium" });
