import type { NextPage } from "next";
import { Box, Image, Badge, Tooltip } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface IMovieCard {
  title: string;
  poster_path: string;
  original_language: string;
  release_month: string;
  release_year: string;
  vote_average: number;
}

const PopularMovieCard: React.FC<IMovieCard> = ({ title, poster_path, original_language, release_month, release_year, vote_average  }) => {
  const image = "https://image.tmdb.org/t/p/w500/" + poster_path;

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl">
      <Image objectFit="cover" src={image} />

      <Box p="6">
        <Box alignItems="baseline">

            <Tooltip label={{original_language}.original_language.match("en")  ? 'English' : 'Non-English Language'} >
              <Badge borderRadius="full" mr="2" px="2" colorScheme={{original_language}.original_language.match("en")  ? 'teal' : 'orange'}>
                {{original_language}.original_language.match("en")  ? 'ENG' : 'NEL'} 
              </Badge>
            </Tooltip> 

            <Tooltip label={"converted vote average: " + vote_average/2}>
              <span>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon key={i} color={i < vote_average/2 ? "teal.500" : "gray.300"}/>
                ))} 
              </span>
            </Tooltip>
                 

          <Box
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="s"
            textTransform="uppercase">
            {title}
          </Box>
        
          <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
            {release_month} {release_year}
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default PopularMovieCard;