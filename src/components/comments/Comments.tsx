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

interface CommentProps {
  comment: Comment;
  movieId: string;
}

interface CommentDataProps {
  userId: string;
  comment: string;
  dateCreated: Date;
}

interface DeleteMovieCommentArgs {
  movieCommentId: string;
}

interface UpdateMovieCommentArgs {
  id: string;
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
      queryClient.invalidateQueries(["comments"], comment.id);
    },
  });

  const CommentData: React.FC<CommentDataProps> = ({ comment, userId, dateCreated }) => {
    const [lines, setLines] = useState(3);

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
        <Editable defaultValue={comment} fontSize="md" isPreviewFocusable={false}>
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
          {/* <Text noOfLines={lines}>{comment}</Text> */}

          <EditComment />
          <Button variant="link" onClick={() => setLines(lines + 100)}>
            Show More
          </Button>
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
          comment={comment.text}
          userId={comment.userId}
          dateCreated={comment.createdAt}
        />
        <Popover>
          <PopoverTrigger>
            <Button variant="ghost">
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
        </Popover>
        <Spacer />
        <Menu>
          <MenuButton variant="ghost" as={Button}>
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
