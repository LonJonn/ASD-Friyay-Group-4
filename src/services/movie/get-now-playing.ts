import { NowPlayingResponse, MoviePreviewResult } from "@app/typings/TMDB";
import { transformMovies } from "@app/services/movie/movie-preview-transformer";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
  startDate: string;
  endDate: string;
}

/**
 * The shape of the service response. (An array of IResponse objects from the above)
 */
//export type GetMoviesSearchResponse = TransformedMovie[];
export type GetNowPlayingMoviesResponse = IResponse;

export async function getNowPlayingMovies(query: string): Promise<GetNowPlayingMoviesResponse> {
  // Make request to TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&region=AU&query=${encodeURI(query)}`
  );
  
  // Parse as JSON, and cast to our type from the TMDB.ts file
  const moviesNowPlayingData = (await response.json()) as NowPlayingResponse;

  // Now we transform the response from TMDB into our custom shape that we want
  // to return from our API.
  
  const transformedMovies = await transformMovies(moviesNowPlayingData.results);

  // Data is transformed into the shape of the IResponse interfact to allow for pagination
  const processed = {} as IResponse;
  processed.page = moviesNowPlayingData.page;
  processed.isLast = (moviesNowPlayingData.page === moviesNowPlayingData.total_pages);
  processed.movies = transformedMovies;
  processed.totalPages = moviesNowPlayingData.total_pages;

  processed.startDate = new Date(moviesNowPlayingData.dates.minimum).getDate()
    + " " + MONTHS[new Date(moviesNowPlayingData.dates.minimum).getMonth()]
    + " " + new Date(moviesNowPlayingData.dates.minimum).getFullYear();
  
  processed.endDate = new Date(moviesNowPlayingData.dates.minimum).getDate() 
    + " " + MONTHS[new Date(moviesNowPlayingData.dates.maximum).getMonth()]
    + " " + new Date(moviesNowPlayingData.dates.maximum).getFullYear();

  return processed;
}
