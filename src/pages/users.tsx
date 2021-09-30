import { NextPage } from "next";
import UserProfile from "../components/user/UserProfile";
import { Heading, Stack, HStack, Button, Spacer} from "@chakra-ui/react";

const UsersPage: NextPage = () => (
  <div>
    <HStack spacing="5rem">
      <Heading as="h1" size="4xl" paddingBottom="3rem">User Movie Review</Heading>
      <Spacer/>
      <Button colorScheme="teal" size="md">Add Review</Button>
    </HStack>

    <HStack>
      <Heading size="lg" paddingBottom="0.5rem">Only Certain People Can Relate</Heading>
      <p> Rating 4/5 ⭐</p> 
      <Spacer/>
      <p> 100 👍🏼</p>
      <p> 3 👎🏼</p>
    </HStack>
    <UserProfile name="Harry Potter 🧙‍♂️"/>
    <p>Some of the scenes are primarily comic, letting the stars banter and interrupt each other and talk over each other and make pleas and snarky asides to the camera. The more dramatic scenes are photographed straight, and there are times when one actor or the other effectively seizes the spotlight, as they might in a stage production, and delivers a long monologue. </p>

    <Stack paddingBottom="1rem">
      <HStack>
        <Heading size="lg" paddingBottom="0.5rem">Moment of Slience</Heading>
        <p> Rating 4/5 ⭐</p> 
        <Spacer/>
        <p> 100 👍🏼</p>
        <p> 3 👎🏼</p>
      </HStack>
      <UserProfile name="Harry Potter 🧙‍♂️"/>
      <p>Some of the scenes are primarily comic, letting the stars banter and interrupt each other and talk over each other and make pleas and snarky asides to the camera. The more dramatic scenes are photographed straight, and there are times when one actor or the other effectively seizes the spotlight, as they might in a stage production, and delivers a long monologue. </p>
    </Stack>
      
    <HStack>
      <Heading size="lg" paddingBottom="0.5rem">The Hype is Real</Heading>
      <p> Rating 4/5 ⭐</p> 
      <Spacer/>
      <p> 100 👍🏼</p>
      <p> 3 👎🏼</p>
    </HStack>
    <UserProfile name="Harry Potter 🧙‍♂️"/>
    <p>Most of the time movies are anticipated like this they end up falling short, way short. Joker is the first time I was more than happy with the hype. Please ignore the complaints of pernicious violence as they are embarrassing to say the least. We havent seen a comic movie this real before. If we ever deserved a better class of criminal - Phillips and Phoenix have delivered. This is dark, Joker IS dark and you will fall in love with the villain as you should. The bad guys are always more romantic anyway.</p>
git   </div>
);

export default UsersPage;
