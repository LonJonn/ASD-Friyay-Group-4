import {
  Heading,
  Stack,
  HStack,
  Text,
  Button,
  Spacer,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import UserProfile from "../user/UserProfile";

export interface ReviewCard {
  title: string;
  description: string;
  userName: string;
  ratings: number;
  upVotes: number;
  downVotes: number;
}

const UserReviewCard: React.FC<ReviewCard> = ({ title, description, userName, ratings, upVotes, downVotes }) => {
  return (
    <Stack>
      <HStack paddingTop={10}> 
          <Heading size="lg" paddingBottom="0.5rem"> {title} </Heading>
          <p>  {ratings}/5 ⭐</p>
          <Spacer/>
          <p> {upVotes} 👍</p>
          <p> {downVotes} 👎</p>
      </HStack>
      <Heading as="h3">{userName} 🧙</Heading>
      <Text>
          {description}
      </Text>
    </Stack>
  );
};

export default UserReviewCard;