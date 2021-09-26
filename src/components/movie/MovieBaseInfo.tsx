import { Box, Image, Text, Heading, Table, Stack, Badge, Tooltip, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Genre, Cast, Country } from "@app/typings";
import React from "react";

interface IMovieBaseInfoCard {
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
  classificationRating: Country[];
}

const MovieHeader: React.FC<IMovieBaseInfoCard> = ({ title, poster_path, original_language, release_month, release_year,
  overview, tagline, budget, revenue, runtime, genres, writers, exec_producers, producers, classificationRating }) => {
  return (
    <Box p={4} display={{ md: "flex" }}>
      <Box flexShrink={0}>
        {/* Rendering of the movie poster*/}
        <Image
          borderRadius="lg"
          width="400px"
          src={"https://image.tmdb.org/t/p/w500/" + poster_path}
          alt="Movie Poster"
        />
      </Box>
      
      <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
        {/* Rendering of the movie title as the page heading*/}
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

          {/* A check is performed to determine if an Australian classification rating is available*/}
          {classificationRating.length > 1 ? 
            <Badge borderRadius="full" ml="2" px="2"
              colorScheme={classificationRating[0].certification.match("/MA|MA15+|R|X/g")  ? 'red' : 'teal'}>
              {/* If a classification is provided, it is displayed, else NA is displayed*/}
              {classificationRating[0].certification}</Badge>
            : <Badge borderRadius="full" ml="2" px="2" colorScheme="gray">
              Australian Classification N/A</Badge>
          }
          

        </Heading>
        
        {/* Rendering of the release month and year*/}
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="l" textTransform="uppercase">
          {release_month} {release_year}
        </Box>
        
        {/* Rendering of the genre*/}
        {genres.map(genre => <Badge borderRadius="full" mb="2" mr="2" px="2" colorScheme={genre["name"].match("Horror") ? 'red' : 'teal'}>
          {genre.name}
        </Badge>
        )}

        <br></br>
        
        {/* Rendering of the tag line with custom styling*/}
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

        {/* Rendering of movie overview*/}        
        <Text mt={2} color="gray.500">
          {overview}
        </Text>

        <br></br>
        
        {/* Rendering of a table to display budget, revenue and runtime*/}
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
              {/* The budget and revenue are convered to EN locale to display as currency*/}
                <Td>{budget > 0 ? ("$" + Number(budget).toLocaleString('en')) : "N/A"}</Td>
                <Td>{revenue > 0 ? ("$" + Number(revenue).toLocaleString('en')) : "N/A"}</Td>
              {/* Movie runtime is converted from minutes to hrs and mins format*/}
                <Td>{Math.floor(runtime / 60)} hr {runtime % 60} mins</Td>
            </Tr>
          </Tbody>
        </Table>
        
        <br></br>
        
        {/* Key credits are rendered as a horizontal stack of boxes*/}
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

            {/* Rendering of writers by iterating through the array to render text*/}
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

            {/* Rendering of executive producers by iterating through the array to render text*/}
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
              {/* Rendering of producers by iterating through the array to render text elements*/}
              {producers.map(producer => <Text ml="2">{producer.name}</Text>)}
            </Box>
          </Box>
      </Stack>            

      </Box>
    </Box>
  );
};

export default MovieHeader;