import { Box, IconButton, Spacer, Text } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, NotAllowedIcon } from "@chakra-ui/icons";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Comment } from "@prisma/client";
import CommentData from "./CommentData";

interface ReportedCommentProps {
  comment: Comment;
}

interface DeleteMovieCommentArgs {
  movieCommentId: string;
}

const ReportedComment: React.FC<ReportedCommentProps> = ({ comment }) => {
  const queryClient = useQueryClient();
  async function deleteMovieCommentFunction(deleteMovieCommentArgs: DeleteMovieCommentArgs) {
    const response = await fetch(`/api/comments/${deleteMovieCommentArgs.movieCommentId}`, {
      method: "DELETE",
    });
    return response;
  }
  const deleteMutation = useMutation(deleteMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
  return (
    <>
      <Box>
        <Spacer marginTop={4} />
        <CommentData
          commentId={comment.id}
          comment={comment.text}
          userId={comment.userId}
          dateCreated={comment.createdAt}
        />
        <IconButton variant="ghost" icon={<CheckIcon />} aria-label="approve"></IconButton>
        <IconButton
          variant="ghost"
          icon={<NotAllowedIcon />}
          aria-label="reject"
          onClick={() => deleteMutation.mutate({ movieCommentId: comment.id })}
          // isLoading
          // loadingText="Deleting"
        ></IconButton>
      </Box>
    </>
  );
};

export default ReportedComment;
