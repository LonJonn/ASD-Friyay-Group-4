import { CommentPostBody } from "@app/pages/api/comments/movie/[movieId]";
import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import Comment, { CommentProps } from "./Comment";
import CommentReplyForm, { CommentReplyFormProps } from "./CommentReplyForm";

export interface TopLevelCommentProps extends CommentProps {
  movieId: string;
}

interface CreateMovieCommentArgs {
  movieId: string;
  movieCommentContents: CommentPostBody;
}

async function createMovieCommentFunction(createMovieCommentArgs: CreateMovieCommentArgs) {
  const response = await fetch(`/api/comments/movie/${createMovieCommentArgs.movieId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createMovieCommentArgs.movieCommentContents),
  });
  return response;
}

export default function TopLevelComment({ comment, movieId }: TopLevelCommentProps) {
  const queryClient = useQueryClient();
  const createMutation = useMutation(createMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleReply: CommentReplyFormProps["onSubmit"] = (value) => {
    console.log("unga munga");
    createMutation.mutate({
      movieId: movieId,
      movieCommentContents: { text: value, parentId: comment.id },
    });
  };
  return (
    <Stack alignItems={"flex-start"}>
      <Comment comment={comment} />
      <CommentReplyForm onSubmit={handleReply} />
    </Stack>
  );
}
