import { Stack, Button, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import CommentForm from "../CommentForm";

export interface CommentReplyFormProps {
  onSubmit: (value: string) => void;
}

export default function CommentReplyForm({ onSubmit }: CommentReplyFormProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  return (
    <Stack spacing={4}>
      <Button variant="ghost" onClick={() => setIsReplying(!isReplying)}>
        REPLY
      </Button>
      {isReplying && (
        <Stack
          spacing={4}
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(commentValue);
            setCommentValue("");
          }}
        >
          <Textarea
            placeholder="Type your comment here..."
            size="lg"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          {/* on click the movie id and the comment text are sent to a mutation function */}
          <Button size="xs" resize="horizontal" type="submit">
            COMMENT
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
