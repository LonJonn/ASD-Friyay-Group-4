import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import NextLink from "next/link";
import { Stack, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { getMovies, GetMoviesSearchResponse } from "@app/services/movie";
import PopularMovieCard from "@app/components/movie/MovieCard";
import MovieDiscoverBar from "@app/components/movie/MovieDiscoverBar";
import { useQuery } from "react-query";

const MoviesSearchPage: NextPage = () => {
  return (
    <Stack>
      <Heading>Discover Movies</Heading>
      <Text>To begin discovering movies, select filteration criteria below:</Text>
      <br></br>
      <Stack spacing={8}>
        <MovieDiscoverBar></MovieDiscoverBar>
      </Stack>
    </Stack>
  );
};

export default MoviesSearchPage;