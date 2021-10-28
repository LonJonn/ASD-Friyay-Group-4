import Prisma from "@prisma/client";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Stack } from "@chakra-ui/layout";
import React from "react";

import CommentVote, { CommentVoteProps } from "./CommentVote";
import CommentData, { CommentDataProps } from "./CommentData";
import CommentContextMenu, { CommentContextMenuProps } from "./CommentContextMenu";

export interface CommentProps {
  comment: Prisma.Comment & { user: Prisma.User };
}

export default function Comment({ comment }: CommentProps) {
  /**
   * Comment Vote
   */
  const handleUpvote: CommentVoteProps["onUpvote"] = async (newLikes) => {
    console.log("upvote", newLikes);
  };

  const handleDownvote: CommentVoteProps["onDownvote"] = async (newLikes) => {
    console.log("downvote", newLikes);
  };

  /**
   * Comment Data
   */
  const handleEdit: CommentDataProps["onEdit"] = async (newText) => {
    console.log("edit", newText);
  };

  /**
   * Comment Context Menu
   */
  const handleReport: CommentContextMenuProps["onReport"] = async () => {
    console.log("report");
  };

  const handleDelete: CommentContextMenuProps["onDelete"] = async () => {
    console.log("delete");
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
