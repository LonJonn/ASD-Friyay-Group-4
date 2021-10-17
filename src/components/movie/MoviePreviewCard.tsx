import { LinkBox, Box, Image, Text, LinkOverlay, Badge, Tooltip} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

interface IActorPreviewCard {
    key: number;
    id: number;
    title: string;
    poster_path: string;
    original_language: string;
    release_month: string;
    release_year: string;
    vote_average: number;
}

const PopularMovieCard: React.FC<IActorPreviewCard> = ({
    id,
    title,
    poster_path,
    original_language,
    release_month,
    release_year,
    vote_average,
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClick = () => {
        queryClient.removeQueries("getMovie");
        router.push(`/movies/${id}`);
    };
    
  return (
    <LinkBox borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl" p={4} display={{ md: "flex" }}
    _hover={{ transform: "scale(1.025)", shadow: "2xl" }} onClick={handleClick}>
        {/* The poster photo for each 'card' */}
        <Box flexShrink={0}>
            <Image
                borderRadius="lg"
                width="75px"
                src={poster_path}
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
                        {title}
                    </Text>
                </LinkOverlay>
                
            </Box>          

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
            
            {/* Rendering of the character text*/}
            <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                {release_month} {release_year}
            </Box>
        </Box>
    </LinkBox>
  );
};

export default PopularMovieCard;