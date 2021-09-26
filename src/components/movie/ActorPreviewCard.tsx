import { Box, Image, Text, Wrap, WrapItem, Badge, Tooltip, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface IActorPreviewCard {
  key: number;
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

const PopularMovieCard: React.FC<IActorPreviewCard> = ({ key, id, name, character, profile_path  }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl" p={4} display={{ md: "flex" }}>
        {/* The poster photo for each 'card' */}
        <Box flexShrink={0}>
            <Image
                borderRadius="lg"
                width="75px"
                src={profile_path}
                alt="Movie Poster"
            />
        </Box>

        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>      
            {/* Rendering of the nested box element, with the actor's name */}
            <Box
                fontWeight="bold"
                letterSpacing="wide"
                fontSize="s"
                textTransform="uppercase"
                textAlign="left"
            >
                <Text>
                    {name}
                </Text>
                
            </Box>
            
            {/* Rendering of the character text*/}
            <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                {character}
            </Box>
        </Box>
    </Box>
  );
};

export default PopularMovieCard;