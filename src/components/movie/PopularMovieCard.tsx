import type { NextPage } from "next";
import { Stack, Text, Box, Image, Heading, Badge } from "@chakra-ui/react";

interface IMovieCard {
  title: string;
  release_date: string;
  poster_path: string;
  original_language: string;
  adult: boolean;
  release_month: string;
  release_year: string;
}

const PopularMovieCard: React.FC<IMovieCard> = ({ title, release_date, poster_path, original_language, adult, release_month, release_year  }) => {
  const image = "https://image.tmdb.org/t/p/w500/" + poster_path;
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image objectFit="cover" src={image} />

      <Box p="6">
        <Box alignItems="baseline">

          <Badge borderRadius="full" px="2" colorScheme={{original_language}.original_language.match("en")  ? 'teal' : 'orange'}>
            {original_language}
          </Badge>

          <Badge borderRadius="full" px="2" colorScheme={{adult} ? 'teal' : 'red'}>
            {{adult} ? 'Child Friendly' : 'Adult'}
          </Badge>

          <Box
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="s"
            textTransform="uppercase">
            {title}
          </Box>
        
          <Box color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase">
            {release_month} {release_year}
          </Box>
        </Box>
      </Box>
      

    </Box>
  );
};

export default PopularMovieCard;