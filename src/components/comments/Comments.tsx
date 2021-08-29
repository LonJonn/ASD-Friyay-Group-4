import {Box, Heading, Flex, Text, VStack,HStack, IconButton, Button} from "@chakra-ui/react";
import {ArrowUpIcon, ArrowDownIcon} from "@chakra-ui/icons";

interface CommentProps {
    parentId: string;
    userId: string; 
    movidId: string;
    comment: string;
    likes: number;
    dateCreated: string; // Date    
}


const CommentData: React.FC<CommentProps> = ({comment, userId, dateCreated}) => {
    return (
        <Box>
            <Flex align="center">
                <Heading size="sm" as="h3" mb={0} fontWeight="medium">
                    {userId}
                </Heading>
            </Flex>
            <Text color="gray.500" mb={4}  fontSize="xs" marginBottom={0}>
                {dateCreated}
            </Text>
            <Text noOfLines={3}>{comment}</Text>
            <Button variant="link">Show More</Button>
        </Box>
    )
}

const Comments: React.FC<CommentProps> = ({userId,dateCreated,parentId,comment,likes,movidId}) => {

    return (
        <Box m={8} borderRadius={4} maxWidth="700px" w="full">
            <HStack>
            <VStack spacing="0">
                <IconButton variant="ghost" size="xs" aria-label="Upvote" icon={<ArrowUpIcon/>}/>
                <Text fontSize="xs">{likes}</Text>
                <IconButton variant="ghost" size="xs" aria-label="Downvote" icon={<ArrowDownIcon/>}/>
            </VStack>
            <CommentData comment={comment} userId={userId} dateCreated={dateCreated}/>
            </HStack>
        </Box>

    )
}

export default Comments;