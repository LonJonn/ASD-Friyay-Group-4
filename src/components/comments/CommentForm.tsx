import { Box, Button, Text, Textarea, Avatar, Heading } from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

interface CommentFormProps {}

const CommentForm: React.FC<CommentFormProps> = ({}) => {
  return (
    <>
      <Heading marginTop={8} marginBottom={8}>
        COMMENTS
      </Heading>
      <Textarea placeholder="Type your comment here..." />
      <Button marginBottom={8} size="xs" form="create-form" type="submit">
        COMMENT
      </Button>
      {/* what is form? */}
    </>
  );
};

export default CommentForm;
