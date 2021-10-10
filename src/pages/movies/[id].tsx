import type { NextPage } from "next";
import { Stack, Text, SimpleGrid, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getMovie, GetMovieResponse } from "@app/services/movie";
import { GetMovieCommentsResult } from "@app/services/comment";
import MovieBaseInfo from "@app/components/movie/MovieBaseInfo";
import ActorPreviewCard from "@app/components/movie/ActorPreviewCard";
import { useQuery } from "react-query";
import CommentForm from "@app/components/comments/CommentForm";
import Comments from "@app/components/comments/Comments";
import MovieCard from "@app/components/groups/MovieCard";
import PreviewCard from "@app/components/movie/MoviePreviewCard";

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
  const { id } = router.query;

  // A query executes to retrieve the data elements that need to be displayed
  const query = useQuery<GetMovieResponse, Error>({
    queryKey: "getMovie",
    queryFn: () => getMovieDetails(String(id)),
  });

  const movieCommentsQuery = useQuery<GetMovieCommentsResult, Error>({
    queryKey: ["comments", id],
    queryFn: () => getMovieComments(String(id)),
  });

  if (query.status === "loading" || query.status === "idle") {
    return <Text>Loading...</Text>;
  }

  if (query.status === "error") {
    return <Text>Error...{query.error.message}</Text>;
  }

  // Return 2 components by combining them into a div
  // The MovieBaseInfo card will display summary info about a movie
  // The function also returns an array of cards in a grid with the movie actors

  return (
    <div>
      <MovieBaseInfo
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
        classificationRating={query.data.classificationRating}
      />

      {query.data.actors.length > 0 ? (
        <Heading>Cast</Heading>
      ) : (
        <Text ml="2">Cast Info Unavailable</Text>
      )}

      <br></br>
      
      <Stack spacing={5}>
        <SimpleGrid columns={4} spacingX={4} spacingY={4} maxH="25em" overflowY="scroll">
          {query.data.actors.map((actor) => (
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

      {/* iterate over the recommendations to render */}
      <Heading>Recommended Movies</Heading> 
      <br></br>
      <Stack spacing={5}>
        {query.data.cleanedRecommendations.length > 1
        ?
          <SimpleGrid columns={4} spacingX={4} spacingY={4} maxH="25em" overflowY="scroll">
            {query.data.cleanedRecommendations.map((movie) => (
              <PreviewCard
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
        : <Text>Recommendations are not yet available for this movie. Please check back at a later time. 😪</Text>
        }
        </Stack>

      {/* map over each comment associated to that movie and display */}
      <CommentForm movieId={id as string} />
      <Stack>
        {movieCommentsQuery.data?.map((comment) => (
          <Comments key={comment.id} comment={comment} movieId={id as string} />
        ))}
      </Stack>
    </div>
  );
};

export default Movie;