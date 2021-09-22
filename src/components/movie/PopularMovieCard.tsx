import { Box, Image, Badge, Tooltip, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

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

const PopularMovieCard: React.FC<IMovieCard> = ({ key, id, title, poster_path, original_language, release_month, release_year, vote_average, overview, backdrop_path  }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/movies/${id}`);
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl">
      {/* The poster photo for each 'card' */}
      <Image objectFit="cover" src={"https://image.tmdb.org/t/p/w500/" + poster_path} />

      <Box p="6">
        <Box alignItems="baseline">

          {/* Conditional rendering of a badge, wrapped around a tooltip element */}
          <Tooltip label={{original_language}.original_language.match("en")  ? 'English' : 'Non-English Language'} >
            <Badge borderRadius="full" mr="2" px="2" colorScheme={{original_language}.original_language.match("en")  ? 'teal' : 'orange'}>
              {{original_language}.original_language.match("en")  ? 'ENG' : 'NEL'} 
            </Badge>
          </Tooltip> 

          {/* Rendering of the star rating element, wrapped around a tooltip element */}
          <Tooltip label={"converted vote average: " + vote_average/2}>
            <span>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon key={i} color={i < vote_average/2 ? "teal.500" : "gray.300"}/>
              ))} 
            </span>
          </Tooltip>
                
          {/* Rendering of the nested box element, with a modal popup within */}
          <Box
            as='button'
            onClick={() => handleClick(id)}
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="s"
            textTransform="uppercase"
            textAlign="left"
          >
            {title}
            
            {/* Rendering of the modal popup that appears when the title is clicked */}
            <Modal onClose={onClose} size='xl' isOpen={isOpen}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <Box p="1" overflow="hidden">
                    
                    <Image objectFit="cover" src={"https://image.tmdb.org/t/p/original/" + backdrop_path} />
                    
                    <Box alignItems="baseline">
                      <Box 
                        fontWeight="bold"
                        letterSpacing="wide"
                        fontSize="s"
                        textTransform="uppercase"
                      >
                        {title}
                        
                      </Box>

                      <Box d="flex" alignItems="baseline">
                        {Array(5)
                          .fill('')
                          .map((_, i) => (
                            <StarIcon key={i} color={i < vote_average/2 ? "teal.500" : "gray.300"}/>
                        ))}

                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          &bull; {vote_average} &bull; {original_language}
                        </Box>
                      </Box>

                      <Box>
                        {{overview}.overview ? {overview}.overview : 'Description unavailable.' } 
                      </Box>
                    </Box>
                  </Box>

                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>

              </ModalContent>
            </Modal>
          </Box>
        
          {/* Rendering of the release month and year*/}
          <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
            {release_month} {release_year}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularMovieCard;