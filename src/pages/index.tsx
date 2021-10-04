import type { NextPage } from "next";
import NextLink from "next/link";
import { useSession } from "next-auth/client";
import { Stack, Tab, Tabs, SimpleGrid, TabList, TabPanels, TabPanel, Icon, Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { getPopularMovies, GetPopularMoviesResponse } from "@app/services/movie";
import MovieCard from "@app/components/movie/MovieCard";
import { useQuery } from "react-query";
import MovieSearchBar from "@app/components/movie/MovieSearchBar";

import { getAllUsers } from "./all-users-client";

async function getAllPopularMovies(): Promise<GetPopularMoviesResponse> {
  const res = await fetch("/api/movies");

  if (!res.ok) {
    throw new Error("Unable to get popular movies.");
  }

  return await res.json();
}


const Home: NextPage = () => {
  const [session, loading] = useSession();
  const queryClient = useQueryClient();

  const query = useQuery<GetPopularMoviesResponse, Error>({
    queryKey: "popularMovies",
    queryFn: getAllPopularMovies,
  });

  if (query.status === "loading" || query.status === "idle") {
    return <Text>Loading...</Text>;
  }

  if (query.status === "error") {
    return <Text>Error...{query.error.message}</Text>;
    console.log(query.data);
  }

  return (
    <Stack spacing={8}>
      <Heading mb="4">Welcome!</Heading>
      <MovieSearchBar></MovieSearchBar>
      <Heading size="md">Now Popular</Heading>
      <SimpleGrid columns={6} spacingX={4} spacingY={4}>
        {query.data.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path == null ? 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png' : "https://image.tmdb.org/t/p/w500/" + movie.poster_path}
            original_language={movie.original_language}
            release_month={movie.release_month}
            release_year={String(movie.release_year)}
            vote_average={movie.vote_average}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default Home;
