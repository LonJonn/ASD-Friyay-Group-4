import { Box, Button, Text, Textarea, Avatar } from "@chakra-ui/react"
import {} from "@chakra-ui/icons"

interface CommentFormProps {

}

const CommentForm: React.FC<CommentFormProps> = ({}) => {
    return (
        <>
            <Text fontSize="md" fontWeight="bold" >COMMENTS</Text>
            <Textarea placeholder="Type your comment here..."/>
            <Button size="xs">Comment</Button>
        </>
    )
}

export default CommentForm; 