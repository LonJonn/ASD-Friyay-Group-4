import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import NextLink from "next/link";
import { Stack, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { getMovies, GetMoviesSearchResponse } from "@app/services/movie";
import PopularMovieCard from "@app/components/movie/MovieCard";
import MovieSearchBar from "@app/components/movie/MovieSearchBar";
import { useQuery } from "react-query";

const MoviesSearchPage: NextPage = () => {
  return (
    <Stack spacing={8}>
      <MovieSearchBar></MovieSearchBar>
    </Stack>
  );
};

export default MoviesSearchPage;