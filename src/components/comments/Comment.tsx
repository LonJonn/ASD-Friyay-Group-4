import { Editable, EditableInput, EditablePreview, useEditableControls } from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Box, Heading, HStack } from "@chakra-ui/layout";
import { Button, ButtonGroup, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import CommentForm from "./CommentForm";

export interface CommentProps {
  commentId: string;
  userId: string;
  comment: string;
  dateCreated: Date;
}

interface UpdateMovieCommentArgs {
  id: string;
  text: string;
}

const Comment: React.FC<CommentProps> = ({ comment, userId, dateCreated, commentId }) => {
  const queryClient = useQueryClient();

  async function updateMovieCommentFunction(updateMovieCommentArgs: UpdateMovieCommentArgs) {
    const response = await fetch(`/api/comments/${updateMovieCommentArgs.id}`, {
      method: "PUT",
      body: JSON.stringify(updateMovieCommentArgs),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  const updateMutation = useMutation(updateMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  function EditComment() {
    function EditableControls() {
      const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
        useEditableControls();

      //ternary statement to toggle editing state
      return isEditing ? (
        <ButtonGroup>
          <IconButton
            aria-label="submit-button"
            icon={<CheckIcon />}
            variant="ghost"
            {...getSubmitButtonProps()}
          />
          <IconButton
            aria-label="cancel-button"
            icon={<CloseIcon />}
            variant="ghost"
            {...getCancelButtonProps()}
          />
        </ButtonGroup>
      ) : (
        <Flex>
          <IconButton
            variant="ghost"
            aria-label="edit-button"
            icon={<EditIcon />}
            {...getEditButtonProps()}
          />
        </Flex>
      );
    }
    return (
      <Editable
        defaultValue={comment}
        fontSize="md"
        isPreviewFocusable={false}
        onSubmit={(newComment) => {
          updateMutation.mutate({ id: commentId, text: newComment });
        }}
      >
        <EditablePreview />
        <EditableInput />
        <EditableControls />
      </Editable>
    );
  }

  return (
    <Box>
      <Flex align="center">
        <Heading size="sm" as="h3" mb={0} fontWeight="medium">
          {userId}
        </Heading>
      </Flex>
      <Text color="gray.500" mb={4} fontSize="xs" marginBottom={0}>
        {dateCreated}
      </Text>
      <HStack>
        <EditComment />
      </HStack>
    </Box>
  );
};

export default Comment;
