import type { NextPage } from "next";
import { Stack, Image, AspectRatio, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getMovie, GetMovieResponse } from "@app/services/movie";
import MovieInfo from "@app/components/movie/MovieInfo";
import { useQuery } from "react-query";

async function getMovieDetails(id: string): Promise<GetMovieResponse> {
  const res = await fetch("/api/movies/" + id);

  if (!res.ok) {
    throw new Error("Unable to get movie");
  }

  return await res.json();
}

const Movie: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const query = useQuery<GetMovieResponse, Error>({
    queryKey: "movie",
    queryFn: () => getMovieDetails(String(id))
  });

  if (query.status === "loading" || query.status === "idle") {
    return <Text>Loading...</Text>;
  }

  if (query.status === "error") {
    return <Text>Error...{query.error.message}</Text>;
    console.log(query.data);
  }

  console.log("Movie ID: " + query.data.title);
  return (
    <MovieInfo
      key={query.data.id}
      id={query.data.id}
      title={query.data.title}
      poster_path={query.data.poster_path}
      original_language={query.data.original_language}
      release_month={query.data.release_month}
      release_year={String(query.data.release_year)}
      vote_average={query.data.vote_average}
      overview={query.data.overview}
      backdrop_path={query.data.backdrop_path}
      tagline={query.data.tagline}
      budget={query.data.budget}
      revenue={query.data.revenue}
      runtime={query.data.runtime}
      genres={query.data.genres}
      writers={query.data.writers}
      exec_producers={query.data.execProducers}
      producers={query.data.producers}
    />
  );
};

export default Movie;
