import { AspectRatio, Box, Image, Text, Heading, Table, Flex, Stack, Link, Badge, Tooltip, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Genre, Cast } from "@app/typings";
import React from "react";

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
  tagline: string;
  budget: number;
  revenue: number;
  runtime: number;
  genres: Genre[];
  writers: Cast[];
  exec_producers: Cast[];
  producers: Cast[];
}

const MovieHeader: React.FC<IMovieCard> = ({ id, title, poster_path, original_language, release_month, release_year, vote_average, overview, backdrop_path, tagline, budget, revenue, runtime, genres, writers, exec_producers, producers }) => {
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
        <Heading
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

        </Heading>
        
        {/* Rendering of the release month and year*/}
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="l" textTransform="uppercase">
          {release_month} {release_year}
        </Box>

        {genres.map(genre => <Badge borderRadius="full" mb="2" mr="2" px="2" colorScheme={genre["name"].match("Horror") ? 'red' : 'teal'}>
          {genre.name}
        </Badge>
        )}

        <br></br>

        <Text
          fontWeight="medium"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600" 
          as="i"
        >
          {tagline}
        </Text>

        
        <br></br>        
        <Text mt={2} color="gray.500">
          {overview}
        </Text>

        <br></br>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Budget</Th>
              <Th>Revenue</Th>
              <Th>Runtime</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{budget > 0 ? ("$" + budget) : "N/A"}</Td>
              <Td>{revenue > 0 ? ("$" + revenue) : "N/A"}</Td>
              <Td>{runtime}</Td>
            </Tr>
          </Tbody>
        </Table>
        
        <br></br>
        
        <Stack direction={["column", "row"]} spacing="24px">
          <Box overflow="hidden">
            <Box
              fontWeight="bold"
              letterSpacing="wide"
              fontSize="s"
              textTransform="uppercase"
              textAlign="left"
              ml="2"
            >
              {"Writers/Screenplay"}
            </Box>

            <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
              {writers.map(writer => <Text ml="2">{writer.name}</Text>)}
            </Box>
          </Box>

          <Box overflow="hidden">
            <Box
              fontWeight="bold"
              letterSpacing="wide"
              fontSize="s"
              textTransform="uppercase"
              textAlign="left" 
              ml="2"
            >
              {"Executive Producers"}
            </Box>

            <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
            {exec_producers.map(exec_producer => <Text ml="2">{exec_producer.name}</Text>)}
            </Box>
          </Box>

          <Box overflow="hidden">
            <Box
              fontWeight="bold"
              letterSpacing="wide"
              fontSize="s"
              textTransform="uppercase"
              textAlign="left" 
              ml="2"
            >
              {"Producers"}
            </Box>

            <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
              {producers.map(producer => <Text ml="2">{producer.name}</Text>)}
            </Box>
          </Box>
      </Stack>            

      </Box>
    </Box>
  );
};

export default MovieHeader;