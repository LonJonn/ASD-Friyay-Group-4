import {
  Box,
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
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Comment } from "@prisma/client";
import CommentData from "./CommentData";

interface CommentProps {
  comment: Comment;
  movieId: string;
}

interface DeleteMovieCommentArgs {
  movieCommentId: string;
}

interface ReportMovieCommentArgs {
  id: string;
}

interface CommentLikes {}

async function deleteMovieCommentFunction(deleteMovieCommentArgs: DeleteMovieCommentArgs) {
  const response = await fetch(`/api/comments/${deleteMovieCommentArgs.movieCommentId}`, {
    method: "DELETE",
  });
  return response;
}

async function reportMovieCommentFunction(reportMovieCommentArgs: ReportMovieCommentArgs) {
  const response = await fetch(`/api/comments/report/${reportMovieCommentArgs.id}`, {
    method: "PUT",
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
      queryClient.invalidateQueries(["comments"]);
      onDeleteClose();
    },
  });

  const reportMutation = useMutation(reportMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      onReportClose();
    },
  });

  // comment upvote tracking function
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
              A reported comment will remtain and be manually reviewed by an admin
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => reportMutation.mutate({ id: comment.id })}
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
