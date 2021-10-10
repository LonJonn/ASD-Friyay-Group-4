import { Response, MoviePreviewResult } from "@app/typings/TMDB";

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
}

/**
 * The shape of the service response. (An array of IResponse objects from the above)
 */
//export type GetMoviesSearchResponse = TransformedMovie[];
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

  const transformedMovies = moviesSearchData.results.map((movie): TransformedMovie => {
    // The release date is split into year and month to improve formatting
    const releaseDate = new Date(movie.release_date);
    const year = releaseDate.getFullYear();
    const month = releaseDate.getMonth();
    
    return {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      original_language: movie.original_language,
      release_month: MONTHS[month],
      release_year: year,
      vote_average: movie.vote_average,
      overview: movie.overview,
      backdrop_path: movie.backdrop_path,
    };
  });

  // Data is transformed into the shape of the IResponse interfact to allow for pagination
  const processed = {} as IResponse;
  processed.page = moviesSearchData.page;
  processed.isLast = (moviesSearchData.page === moviesSearchData.total_pages);
  processed.movies = transformedMovies;
  processed.totalPages = moviesSearchData.total_pages;
  

  return processed;
}
