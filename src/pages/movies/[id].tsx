import type { NextPage } from "next";
import { Stack, Text, SimpleGrid, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GetMovieResponse } from "@app/services/movie";
import { GetMovieCommentsResult } from "@app/services/comment";
import MovieBaseInfo from "@app/components/movie/MovieBaseInfo";
import ActorPreviewCard from "@app/components/movie/ActorPreviewCard";
import { useQuery } from "react-query";
import CommentForm from "@app/components/comments/CommentForm";
import Comments from "@app/components/comments/Comments";
import PreviewCard from "@app/components/movie/MoviePreviewCard";
import CommentList from "@app/components/comments/CommentList";

async function getMovieDetails(id: string): Promise<GetMovieResponse> {
  // Data is retrieved from the API layer
  const res = await fetch("/api/movies/" + id);

  if (!res.ok) {
    throw new Error("Unable to get movie");
  }

  return await res.json();
}

async function getMovieComments(id: string): Promise<GetMovieCommentsResult> {
  const commentRes = await fetch(`/api/comments/movie/${id}`, {
    method: "GET",
  });

  if (!commentRes.ok) {
    throw new Error("Unable to get comments");
  }
  return await commentRes.json();
}

const Movie: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  
  // A query executes to retrieve the data elements that need to be displayed
  const movieQuery = useQuery<GetMovieResponse, Error>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id as string),
  });

  const movieCommentsQuery = useQuery<GetMovieCommentsResult, Error>({
    queryKey: ["comments", id],
    queryFn: () => getMovieComments(String(id)),
  });

  if (movieQuery.status === "loading" || movieQuery.status === "idle") {
    return <Text>Loading...</Text>;
  }

  if (movieQuery.status === "error") {
    console.log(movieQuery.error.stack);
    return <Text>Error...{movieQuery.error.message}</Text>;
  }

  // Return components by combining them into a div
  // The MovieBaseInfo card will display summary info about a movie
  // The function also returns an array of cards in a grid with the movie actors

  return (
    <div>
      <MovieBaseInfo
        key={movieQuery.data.id}
        id={movieQuery.data.id}
        title={movieQuery.data.title}
        poster_path={movieQuery.data.poster_path}
        original_language={movieQuery.data.original_language}
        release_month={movieQuery.data.release_month}
        release_year={String(movieQuery.data.release_year)}
        vote_average={movieQuery.data.vote_average}
        overview={movieQuery.data.overview}
        backdrop_path={movieQuery.data.backdrop_path}
        tagline={movieQuery.data.tagline}
        budget={movieQuery.data.budget}
        revenue={movieQuery.data.revenue}
        runtime={movieQuery.data.runtime}
        genres={movieQuery.data.genres}
        writers={movieQuery.data.writers}
        exec_producers={movieQuery.data.execProducers}
        producers={movieQuery.data.producers}
        classificationRating={movieQuery.data.classificationRating}
      />

      {movieQuery.data.actors.length > 0 ? (
        <Heading>Cast</Heading>
      ) : (
        <Text ml="2">Cast Info Unavailable</Text>
      )}

      <br></br>

      <Stack spacing={5}>
        <SimpleGrid columns={4} spacingX={4} spacingY={4} maxH="25em" overflowY="scroll">
          {movieQuery.data.actors.map((actor) => (
            <ActorPreviewCard
              key={actor.id}
              id={actor.id}
              name={actor.name}
              character={actor.character}
              profile_path={
                actor.profile_path == null
                  ? "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
                  : "https://image.tmdb.org/t/p/w500/" + actor.profile_path
              }
            />
          ))}
        </SimpleGrid>
      </Stack>

      <br></br>

      {/* iterate over the recommendations to render preview cards */}
      <Heading>Recommended Movies</Heading>
      <br></br>
      <Stack spacing={5}>
        {movieQuery.data.cleanedRecommendations.length > 1 ? (
          <SimpleGrid columns={4} spacingX={4} spacingY={4} maxH="25em" overflowY="scroll">
            {movieQuery.data.cleanedRecommendations.map((movie) => (
              <PreviewCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={
                  movie.poster_path == null
                    ? "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
                    : "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                }
                original_language={movie.original_language}
                release_month={movie.release_month}
                release_year={String(movie.release_year)}
                vote_average={movie.vote_average}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text>
            Recommendations are not yet available for this movie. Please check back at a later time.
            😪
          </Text>
        )}
      </Stack>

      <CommentList movieId={id as string} comments={movieCommentsQuery.data || []} />
    </div>
  );
};

export default Movie;