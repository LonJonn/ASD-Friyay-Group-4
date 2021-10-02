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
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { MovieCommentsGetResponse } from "@app/pages/api/comments/[movieId]";
// import { deleteMovieComment } from "@app/services/comment";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface CommentProps {
  parentId: string;
  userId: string;
  movieId: number;
  comment: string;
  likes: number;
  dateCreated: Date; // Date
}

interface CommentDataProps {
  userId: string;
  comment: string;
  dateCreated: Date;
}

interface DeleteCommentArgs {
  movieCommentId: string;
}

const CommentData: React.FC<CommentDataProps> = ({ comment, userId, dateCreated }) => {
  // const queryClient = useQueryClient();
  const [lines, setLines] = useState(3);

  async function deleteComment(deleteCommentArgs: DeleteCommentArgs) {
    const response = await fetch(`/api/comments/${deleteCommentArgs.movieCommentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteCommentArgs.movieCommentId),
    });
    return response;
  }

  // const deleteMutation = useMutation(deleteMovieComment, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["movieComment"]);
  //   },
  // });

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
      <Text noOfLines={lines}>{comment}</Text>
      <Button variant="link" onClick={() => setLines(lines + 100)}>
        Show More
      </Button>
    </Box>
  );
};

const Comments: React.FC<CommentProps> = ({ userId, dateCreated, comment, likes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <HStack mb="4">
        <Wrap>
          <WrapItem>
            <Avatar name="userId" src="" />
          </WrapItem>
        </Wrap>
        <VStack spacing="0">
          <IconButton variant="ghost" size="xs" aria-label="Upvote" icon={<ArrowUpIcon />} />
          <Text fontSize="xs">{likes}</Text>
          <IconButton variant="ghost" size="xs" aria-label="Downvote" icon={<ArrowDownIcon />} />
        </VStack>
        <CommentData comment={comment} userId={userId} dateCreated={dateCreated} />

        <IconButton
          aria-label="Delete comment"
          icon={<DeleteIcon />}
          colorScheme="red"
          varient="red"
          onClick={onOpen}
        >
          Open Modal
        </IconButton>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this comment permanently?</ModalBody>
            <ModalFooter>
              {/* <Button colorScheme="red" size="sm" onClick={ () => deleteMovieComment()}>
                DELETE
              </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </Box>
  );
};

export default Comments;
