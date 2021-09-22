import { AspectRatio, Box, Image, Text, Stack, Link, Badge, Tooltip, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface IMovieCard {
  key: number;
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  original_language: string;
  release_month: string;
  release_year: string;
  vote_average: number;
}

const MovieHeader: React.FC<IMovieCard> = ({ id, title, poster_path, original_language, release_month, release_year, vote_average, overview, backdrop_path }) => {
  return (
    <Box p={4} display={{ md: "flex" }}>
      <Box flexShrink={0}>
        <Image
          borderRadius="lg"
          width="400px"
          src={"https://image.tmdb.org/t/p/w500/" + poster_path}
          alt="Movie Poster"
        />
      </Box>
      <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="4xl"
          letterSpacing="wide"
          color="teal.600"
        >
          {title}
          
          <Tooltip label={{original_language}.original_language.match("en")  ? 'English' : 'Non-English Language'} >
            <Badge borderRadius="full" ml="2" px="2" colorScheme={{original_language}.original_language.match("en")  ? 'teal' : 'orange'}>
              {{original_language}.original_language.match("en")  ? 'ENG' : 'NEL'} 
            </Badge>
          </Tooltip>
        </Text>
        
        {/* Rendering of the release month and year*/}
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="l" textTransform="uppercase">
          {release_month} {release_year}
        </Box>
        <br></br>        
        <Text mt={2} color="gray.500">
          {overview}
        </Text>
      </Box>
    </Box>
  );
};

export default MovieHeader;