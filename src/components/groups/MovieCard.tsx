import type { NextPage } from "next";
import { Stack } from "@chakra-ui/react";

interface IMovieCard {
  name: String;
  poster: String;
}

const MovieCard: React.FC<IMovieCard> = ({ name, poster }) => {
  return <div>Movie Card to in the Group Page</div>;
};

export default MovieCard;
