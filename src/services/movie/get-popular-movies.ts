import fetch from "node-fetch";

import { PopularMoviesResponse, PopularMovieResult } from "@app/typings/TMDB";

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
  extends Pick<PopularMovieResult, "id" | "title" | "poster_path" | "original_language"> {
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
  const popularMoviesData = (await response.json()) as PopularMoviesResponse;

  // Now we transform the response from TMDB into our custom shape that we want
  // to return from our API.
  const transformedMovies = popularMoviesData.results.map((movie): TransformedMovie => {
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
    };
  });

  return transformedMovies;
}