import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import NextLink from "next/link";
import { Stack, Tab, Tabs, SimpleGrid, TabList, TabPanels, TabPanel, Icon, Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { getPopularMovies, GetPopularMoviesResponse } from "@app/services/movie";
import PopularMovieCard from "@app/components/movie/PopularMovieCard";
import { useQuery } from "react-query";

async function getAllPopularMovies(): Promise<GetPopularMoviesResponse> {
  const res = await fetch("/api/movies");

  if (!res.ok) {
    throw new Error("Unable to get popular movies.");
  }

  return await res.json();
}

const PopularMoviesPage: NextPage = () => {
  const query = useQuery<GetPopularMoviesResponse, Error>({
    queryFn: getPopularMovies,
  });

  if (query.status === "loading" || query.status === "idle") {
    return <Text>Loading...</Text>;
  }

  if (query.status === "error") {
    return <Text>Error...{query.error.message}</Text>;
  }

  return (
    /*
    <Box>
      <Heading mb="4">Movies</Heading>
      <List>
        {query.data.map((movie) => (
          <ListItem key={movie.id}>
            {movie.id} - {movie.title} - {movie.poster_path} - {movie.release_date}
          </ListItem>
        ))}
      </List>
    </Box>
    */

    <Stack spacing={8}>
      <Heading mb="4">Popular Movies</Heading>

      <SimpleGrid columns={6} spacingX={4} spacingY={4}>
        {query.data.map((movie) => (
          <PopularMovieCard
            title={movie.title}
            release_date={movie.release_date}
            poster_path={movie.poster_path}
            original_language={movie.original_language}
            adult={movie.adult}
            release_month={movie.release_month}
            release_year={movie.release_year}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default PopularMoviesPage;