import Prisma from "@prisma/client";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Stack } from "@chakra-ui/layout";
import React from "react";

import CommentVote, { CommentVoteProps } from "./CommentVote";
import CommentData, { CommentDataProps } from "./CommentData";
import CommentContextMenu, { CommentContextMenuProps } from "./CommentContextMenu";
import { useMutation, useQueryClient } from "react-query";

export interface CommentProps {
  comment: Prisma.Comment & { user: Prisma.User };
}
interface UpdateMovieCommentArgs {
  id: string;
  text: string;
}
interface DeleteMovieCommentArgs {
  movieCommentId: string;
}
interface ReportMovieCommentArgs {
  id: string;
}

interface UpvoteMovieCommentArgs {
  id: string;
}

interface DownvoteMovieCommentArgs {
  id: string;
}

async function upvoteMovieCommentFunction(upvoteMovieCommentArgs: UpvoteMovieCommentArgs) {
  const response = await fetch(`/api/comments/upvote/${upvoteMovieCommentArgs.id}`, {
    method: "PUT",
    body: JSON.stringify(upvoteMovieCommentArgs),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

async function downvoteMovieCommentFunction(downvoteMovieCommentArgs: DownvoteMovieCommentArgs) {
  const response = await fetch(`/api/comments/downvote/${downvoteMovieCommentArgs.id}`, {
    method: "PUT",
    body: JSON.stringify(downvoteMovieCommentArgs),
    headers: {
      "Content-Type": "application/json",
    },
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

export default function Comment({ comment }: CommentProps) {
  const queryClient = useQueryClient();

  const upvoteMutation = useMutation(upvoteMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const downvoteMutation = useMutation(downvoteMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const updateMutation = useMutation(updateMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const deleteMutation = useMutation(deleteMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const reportMutation = useMutation(reportMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  /**
   * Comment Vote
   */
  const handleUpvote: CommentVoteProps["onUpvote"] = async (newLikes) => {
    upvoteMutation.mutate({ id: comment.id });
  };

  const handleDownvote: CommentVoteProps["onDownvote"] = async (newLikes) => {
    downvoteMutation.mutate({ id: comment.id });
  };

  /**
   * Comment Data
   */
  const handleEdit: CommentDataProps["onEdit"] = async (newText) => {
    updateMutation.mutate({ id: comment.id, text: newText });
  };

  /**
   * Comment Context Menu
   */
  const handleReport: CommentContextMenuProps["onReport"] = async () => {
    reportMutation.mutate({ id: comment.id });
  };

  const handleDelete: CommentContextMenuProps["onDelete"] = async () => {
    deleteMutation.mutate({ movieCommentId: comment.id });
  };

  return (
    <Stack direction="row" spacing={4} alignItems="center">
      <Avatar src={comment.user.image!} name={comment.user.name!} />
      <CommentVote likes={comment.likes} onUpvote={handleUpvote} onDownvote={handleDownvote} />
      <CommentData {...comment} onEdit={handleEdit} />
      <CommentContextMenu
        ownerId={comment.userId}
        onReport={handleReport}
        onDelete={handleDelete}
      />
    </Stack>
  );
}
