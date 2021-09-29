import { MovieSearchResponse, MovieSearchResult } from "@app/typings/TMDB";

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
    MovieSearchResult,
    "id" | "title" | "poster_path" | "original_language" | "vote_average" | "overview" | "backdrop_path"
  > {
  release_month: string;
  release_year: number;
}

/**
 * The shape of the service response. (An array of TranformedMovies from above)
 */
export type GetMoviesSearchResponse = TransformedMovie[];

export async function getMovies(query: string, page: number): Promise<GetMoviesSearchResponse> {
  // Make request to TMDB
  console.log(query);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURI(query)}&include_adult=false`
  );
  

  // Parse as JSON, and cast to our type from the TMDB.ts file
  const moviesSearchData = (await response.json()) as MovieSearchResponse;

  // Now we transform the response from TMDB into our custom shape that we want
  // to return from our API.

  const transformedMovies = moviesSearchData.results.map((movie): TransformedMovie => {
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

  return transformedMovies;
}
