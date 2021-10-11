import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import NextLink from "next/link";
import { Stack, SimpleGrid, Heading, Text, HStack } from "@chakra-ui/react";
import { GetNowPlayingMoviesResponse } from "@app/services/movie";
import MovieCard from "@app/components/movie/MovieCard";
import { useQuery } from "react-query";
import PopularMovieCard from "@app/components/movie/MovieCard";
import { useRouter } from "next/router";
import NavigationButton from "@app/components/movie/NavigationButton";


async function getNowPlayingMovies(): Promise<GetNowPlayingMoviesResponse> {
  const res = await fetch("/api/movies/now-playing/page=1");

  if (!res.ok) {
    throw new Error("Unable to get popular movies.");
  }

  return await res.json();
}


const PopularMoviesPage: NextPage = () => {
  const router = useRouter();

  const query = useQuery<GetNowPlayingMoviesResponse, Error>({
    queryKey: "nowPlaying",
    queryFn: getNowPlayingMovies,
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
      <Heading>Now Playing</Heading>
      
      <Heading size="sm">Date Range: {query.data.startDate} - {query.data.endDate}</Heading>

      <SimpleGrid columns={6} spacingX={4} spacingY={4}>
          {query.data.movies.map((movie) => (
          <PopularMovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path === null ? 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png' : "https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              original_language={movie.original_language}
              release_month={movie.release_month}
              release_year={String(movie.release_year)}
              vote_average={movie.vote_average}
          />
          ))}
      </SimpleGrid>
      {/* If this is not the last page render nav bars, otherwise show no more results */}
      {!query.data.isLast ?
          <HStack space="24px">
              {/* If this is not the first page, show a back button */}
              {query.data.page != 1 ?
                  <NavigationButton search={String("")} nextPage={Number(query.data.page - 1)} navigationDirection="Previous" endpoint="now-playing"></NavigationButton>
              : "N/A"}
              {/* The next button will show provided the outer if statement holds true */}
              <NavigationButton search={String("")} nextPage={Number(query.data.page + 1)} navigationDirection="Next" endpoint="now-playing"></NavigationButton>
          </HStack>
      :   
          <Text>No more results {/* Renders when only one page was returned from the API */}</Text> 
      }
      {/* If this is the last page and more than 1 page in total was returned */}
      {query.data.isLast && query.data.totalPages > 1 ? <NavigationButton search={String("")} nextPage={Number(query.data.page - 1)} navigationDirection="Previous" endpoint="now-playing"></NavigationButton> : "N/A"}
    </Stack>
  );
};

export default PopularMoviesPage;