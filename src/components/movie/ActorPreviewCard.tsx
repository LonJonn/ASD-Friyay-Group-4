import { LinkBox, Box, Image, Text, LinkOverlay } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

interface IActorPreviewCard {
  key: number;
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

const PopularMovieCard: React.FC<IActorPreviewCard> = ({ id, name, character, profile_path  }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClick = () => {
        queryClient.invalidateQueries(["movie"]);
        router.push(`/actors/${id}`);
    };

    return (
        <LinkBox borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl" p={4}
        _hover={{ transform: "scale(1.025)", shadow: "2xl" }} display={{ md: "flex" }} onClick={handleClick}>
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
                    <LinkOverlay href="#">
                        <Text>
                            {name}
                        </Text>
                    </LinkOverlay>
                    
                </Box>
                
                {/* Rendering of the character text*/}
                <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                    {character}
                </Box>
            </Box>
        </LinkBox>
    );
};

export default PopularMovieCard;