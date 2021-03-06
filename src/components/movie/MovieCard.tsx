import {
  Box,
  Image,
  Badge,
  Tooltip,
  LinkBox,
  LinkOverlay,
  Text
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface IMovieCard {
  key: number;
  id: number;
  title: string;
  poster_path: string;
  original_language: string;
  release_month: string;
  release_year: string;
  vote_average: number;
}

const MovieCard: React.FC<IMovieCard> = ({
  id,
  title,
  poster_path,
  original_language,
  release_month,
  release_year,
  vote_average,
}) => {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/movies/${id}`);
  };

  return (
    <LinkBox maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"
    _hover={{ transform: "scale(1.025)", shadow: "2xl" }} boxShadow="2xl">
      {/* The poster photo for each 'card' */}
      <Box>
        <Image
          objectFit="cover"
          src={poster_path}
          alt="Movie Poster"
        />
      </Box>

      <Box p="6">
        <Box alignItems="baseline">
          {/* Conditional rendering of a badge, wrapped around a tooltip element */}
          <Tooltip
            label={
              { original_language }.original_language.match("en")
                ? "English"
                : "Non-English Language"
            }
          >
            <Badge
              borderRadius="full"
              mr="2"
              px="2"
              colorScheme={{ original_language }.original_language.match("en") ? "teal" : "orange"}
            >
              {{ original_language }.original_language.match("en") ? "ENG" : "NEL"}
            </Badge>
          </Tooltip>

          {/* Rendering of the star rating element, wrapped around a tooltip element */}
          <Tooltip label={"converted vote average: " + vote_average / 2}>
            <span>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon key={i} color={i < vote_average / 2 ? "teal.500" : "gray.300"} />
                ))}
            </span>
          </Tooltip>

          {/* Rendering of the nested box element, with a modal popup within */}
          <Box
            as="button"
            onClick={() => handleClick(id)}
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="s"
            textTransform="uppercase"
            textAlign="left"
          >
            <LinkOverlay>
              <Text>
                {title}
              </Text>
            </LinkOverlay>
          </Box>

          {/* Rendering of the release month and year */}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {release_month != null && release_year != null
              ? `${release_month} ${release_year}`
              : "Release Date N/A"}
          </Box>
        </Box>
      </Box>
    </LinkBox>
  );
};

export default MovieCard;
