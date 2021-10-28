import { GetMovieGroupResponse } from "@app/pages/api/groups/movies/[id]";
import { GetMovieResponse } from "@app/services/movie";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";
import { updateLayoutMeasurement } from "framer-motion/types/render/dom/projection/utils";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateGroupFunction } from "./AddToMovieGroup";

interface IMovieCard {
  movie: GetMovieResponse;
  movieGroup: GetMovieGroupResponse;
}

const MovieCard: React.FC<IMovieCard> = ({ movie, movieGroup }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateGroupFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["movieGroup", movieGroup.id]);
    },
  });

  return (
    <Box
      overflow="hidden"
      maxH="445px"
      borderWidth={2}
      _hover={{ transform: "scale(1.02)", boxShadow: "2xl", transition: "0.5s" }}
      onClick={() => router.push(`/movies/${movie.id}`)}
    >
      <Image
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        objectFit="cover"
        position="relative"
      />
      <DeleteIcon
        as="button"
        w={5}
        h={5}
        pos="absolute"
        top={0}
        right={0}
        transform="auto"
        translateY="50%"
        translateX="-50%"
        color="gray.100"
        _hover={{ color: "red.300", transition: "0.5s" }}
        onClick={(e) => {
          const updatedMovieIds = movieGroup.movieIds.filter((id) => id != movie.id.toString());
          updateMutation.mutate({
            type: "movies",
            movieGroupId: movieGroup.id,
            movieGroupContents: { movieIds: updatedMovieIds },
          });
          e.stopPropagation();
        }}
      />
    </Box>
  );
};

export default MovieCard;
