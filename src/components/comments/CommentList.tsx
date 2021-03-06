import Comment from "./comment/Comment";
import Prisma from "@prisma/client";
import { Stack } from "@chakra-ui/layout";
import CommentForm from "./CommentForm";
import TopLevelComment from "./comment/TopLevelComment";

export interface CommentListProps {
  movieId: string;
  comments: (Prisma.Comment & { user: Prisma.User })[];
}

export default function CommentList({ movieId, comments }: CommentListProps) {
  return (
    <Stack direction="column" spacing={8}>
      <CommentForm movieId={movieId} />

      <Stack direction="column" spacing={4}>
        {comments.map((comment) => (
          <TopLevelComment key={comment.id} comment={comment} movieId={movieId} />
        ))}
      </Stack>
    </Stack>
  );
}
