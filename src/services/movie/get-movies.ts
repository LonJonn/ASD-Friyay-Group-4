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

interface IResponse {
  movies: TransformedMovie[];
  page: number;
  isLast: boolean;
  totalPages: number;
}

/**
 * The shape of the service response. (An array of IResponse objects from the above)
*/

export type GetMoviesSearchResponse = IResponse;

export async function getMovies(query: string): Promise<GetMoviesSearchResponse> {
  // Make request to TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURI(query)}&include_adult=false`
  );
  
  // Parse as JSON, and cast to our type from the TMDB.ts file
  const moviesSearchData = (await response.json()) as Response;

  // Now we transform the response from TMDB into our custom shape that we want
  // to return from our API.
  
  const transformedMovies = await transformMovies(moviesSearchData.results);

  // Data is transformed into the shape of the IResponse interfact to allow for pagination
  const processed = {} as IResponse;
  processed.page = moviesSearchData.page;
  processed.isLast = (moviesSearchData.page === moviesSearchData.total_pages);
  processed.movies = transformedMovies;
  processed.totalPages = moviesSearchData.total_pages;
  
  return processed;
}
