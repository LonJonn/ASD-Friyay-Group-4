import { Response, MoviePreviewResult } from "@app/typings/TMDB";
import { transformMovies } from "@app/services/movie/movie-preview-transformer";

/**
 * Internal type used in this service.
 */
interface TransformedMovie
  extends Pick<
  MoviePreviewResult,
    "id" | "title" | "poster_path" | "original_language" | "vote_average" | "overview" | "backdrop_path"
  > {
  release_month: string;
  release_year: number;
}

/**
 * The shape of the service response. (An array of TranformedMovies from above)
*/

export type GetPopularMoviesResponse = TransformedMovie[];

export async function getPopularMovies(): Promise<GetPopularMoviesResponse> {
  // Make request to TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  // Parse as JSON, and cast to our type from the TMDB.ts file
  const popularMoviesData = (await response.json()) as Response;

  // Now we transform the response from TMDB into our custom shape that we want
  // to return from our API. 
  const transformedMovies = await transformMovies(popularMoviesData.results);
  
  return transformedMovies;
}
