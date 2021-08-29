import { Box, Text, Textarea } from "@chakra-ui/react"
import {} from "@chakra-ui/icons"

interface CommentFormProps {

}

const CommentForm: React.FC<CommentFormProps> = ({}) => {
    return (
        <>
            <Text fontSize="xl">Comments</Text>
            <Textarea placeholder="Type your comment here..."/>
        </>
    )
}

export default CommentForm;