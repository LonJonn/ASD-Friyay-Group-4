import { IconButton } from "@chakra-ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import React from "react";

export interface CommentVoteProps {
  likes: number;
  onUpvote: (newLikes: number) => void;
  onDownvote: (newLikes: number) => void;
}

export default function CommentVote({ likes, onUpvote, onDownvote }: CommentVoteProps) {
  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <IconButton
        variant="ghost"
        size="xs"
        aria-label="Upvote"
        icon={<ArrowUpIcon />}
        onClick={() => onUpvote(likes + 1)}
      />
      <Text fontSize="xs">{likes}</Text>
      <IconButton
        variant="ghost"
        size="xs"
        aria-label="Downvote"
        icon={<ArrowDownIcon />}
        onClick={() => onDownvote(likes - 1)}
      />
    </Stack>
  );
}
