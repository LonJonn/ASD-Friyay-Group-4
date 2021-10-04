import {
  Box,
  Heading,
  Flex,
  Text,
  VStack,
  HStack,
  IconButton,
  Button,
  Wrap,
  WrapItem,
  Avatar,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  useEditableControls,
} from "@chakra-ui/react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  HamburgerIcon,
  AddIcon,
  CheckIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Comment } from "@prisma/client";
import Id from "@app/pages/groups/[id]";

interface CommentProps {
  comment: Comment;
  movieId: string;
}

interface CommentDataProps {
  commentId: string;
  userId: string;
  comment: string;
  dateCreated: Date;
}

interface DeleteMovieCommentArgs {
  movieCommentId: string;
}

interface UpdateMovieCommentArgs {
  id: string;
  text: string;
}

interface CommentLikes {}

async function deleteMovieCommentFunction(deleteMovieCommentArgs: DeleteMovieCommentArgs) {
  const response = await fetch(`/api/comments/${deleteMovieCommentArgs.movieCommentId}`, {
    method: "DELETE",
  });

  return response;
}

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

const Comments: React.FC<CommentProps> = ({ comment, movieId }) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [likes, setLikes] = useState(comment.likes);

  const deleteMutation = useMutation(deleteMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", movieId]);
      onClose();
    },
  });
  const updateMutation = useMutation(updateMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", movieId]);
    },
  });

  const CommentData: React.FC<CommentDataProps> = ({ comment, userId, dateCreated, commentId }) => {
    function EditComment() {
      function EditableControls() {
        const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
          useEditableControls();

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
      <>
        <Box>
          <Flex align="center">
            <Heading size="sm" as="h3" mb={0} fontWeight="medium">
              {userId}
            </Heading>
          </Flex>
          <Text color="gray.500" mb={4} fontSize="xs" marginBottom={0}>
            {dateCreated}
          </Text>
          <EditComment />
        </Box>
      </>
    );
  };

  const Upvote: React.FC<CommentLikes> = ({}) => {
    var voteCount = comment.likes;
    var userVote = 0;
    return (
      <>
        <IconButton
          variant="ghost"
          size="xs"
          aria-label="Upvote"
          icon={<ArrowUpIcon />}
          onClick={() => setLikes((comment.likes += userVote === 1 ? 0 : 1))}
        />
        <Text fontSize="xs">{likes}</Text>
        <IconButton
          variant="ghost"
          size="xs"
          aria-label="Downvote"
          icon={<ArrowDownIcon />}
          onClick={() => setLikes((comment.likes += userVote === -1 ? 0 : -1))}
        />
      </>
    );
  };

  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <HStack mb="4">
        <Wrap>
          <WrapItem>
            <Avatar name="userId" src="" />
          </WrapItem>
        </Wrap>
        <VStack spacing="0">
          <Upvote></Upvote>
        </VStack>
        <CommentData
          commentId={comment.id}
          comment={comment.text}
          userId={comment.userId}
          dateCreated={comment.createdAt}
        />
        {/* <Popover isLazy placement="bottom-start">
          <PopoverTrigger>
            <Button variant="ghost" flexShrink={0}>
              <AddIcon />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverBody>
                <Button variant="ghost">😆</Button>
                <Button variant="ghost">😲</Button>
                <Button variant="ghost">😢</Button>
                <Button variant="ghost">😠</Button>
                <Button variant="ghost">👍</Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover> */}
        <Spacer />
        <Menu>
          <MenuButton variant="ghost" alignItems="center" as={Button} flexShrink={0}>
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Delete</MenuItem>
          </MenuList>
        </Menu>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this comment permanently?</ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => deleteMutation.mutate({ movieCommentId: comment.id })}
              >
                DELETE
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </Box>
  );
};

export default Comments;
