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
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
  const [likes, setLikes] = useState(comment.likes);

  const deleteMutation = useMutation(deleteMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", movieId]);
      onDeleteClose();
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
        <Spacer />
        <Menu>
          <MenuButton variant="ghost" alignItems="center" as={Button} flexShrink={0}>
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onReportOpen}>Report</MenuItem>
            <MenuItem onClick={onDeleteOpen}>Delete</MenuItem>
          </MenuList>
        </Menu>

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
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
        <Modal isOpen={isReportOpen} onClose={onReportClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Report comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to report this comment?</ModalBody>
            <ModalBody fontSize={"sm"}>
              A reported comment will be manually reviewed by a discord mod
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => deleteMutation.mutate({ movieCommentId: comment.id })}
              >
                REPORT
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </Box>
  );
};

export default Comments;
