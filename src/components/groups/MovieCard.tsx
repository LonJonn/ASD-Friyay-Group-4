import { GetMovieResponse } from "@app/services/movie";
import { Box, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface IMovieCard {
  movie: GetMovieResponse;
}

const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  const router = useRouter();
  return (
    <Box
      overflow="hidden"
      maxH="445px"
      _hover={{ transform: "scale(1.02)", transition: "0.5s" }}
      onClick={() => router.push(`/movies/${movie.id}`)}
    >
      <Image src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} objectFit="cover" />
    </Box>
  );
};

export default MovieCard;
