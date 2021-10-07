import { Button, Textarea, Heading } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { CommentPostBody } from "@app/pages/api/comments/movie/[movieId]";

interface CommentFormProps {
  movieId: string;
}

interface CreateMovieCommentArgs {
  movieId: string;
  movieCommentContents: CommentPostBody;
}

//
async function createMovieCommentFunction(createMovieCommentArgs: CreateMovieCommentArgs) {
  const response = await fetch(`/api/comments/movie/${createMovieCommentArgs.movieId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createMovieCommentArgs.movieCommentContents),
  });
  return response;
}

const CommentForm: React.FC<CommentFormProps> = ({ movieId }) => {
  const queryClient = useQueryClient();
  const [commentValue, setCommentValue] = useState("");

  // the mutation function handles the fetch request sent to the API and revalidates stale data
  const createMutation = useMutation(createMovieCommentFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      setCommentValue("");
    },
  });

  return (
    <>
      <Heading marginTop={8} marginBottom={8}>
        COMMENTS
      </Heading>
      <Textarea
        placeholder="Type your comment here..."
        size="lg"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />
      {/* on click the movie id and the comment text are sent to a mutation function */}
      <Button
        marginTop={4}
        marginBottom={8}
        size="xs"
        resize="horizontal"
        onClick={() =>
          createMutation.mutate({ movieId: movieId, movieCommentContents: { text: commentValue } })
        }
      >
        COMMENT
      </Button>
    </>
  );
};

export default CommentForm;
