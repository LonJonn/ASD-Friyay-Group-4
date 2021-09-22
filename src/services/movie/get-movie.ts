import { MovieDetail } from "@app/typings/TMDB";

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
    MovieDetail,
    "id" | "title" | "poster_path" | "original_language" | "vote_average" | "overview" | "backdrop_path" | "production_companies" | "status" | "budget" | "runtime" | "revenue"
  > {
  release_month: string;
  release_year: number;
}

/**
 * The shape of the service response. (An array of TranformedMovies from above)
 */
export type GetMovieResponse = TransformedMovie;

export async function getMovie(id: string): Promise<GetMovieResponse> {
  // Make request to TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  // Parse as JSON, and cast to our type from the TMDB.ts file
  const movieData = (await response.json()) as MovieDetail;

  // Now we transform the response from TMDB into our custom shape that we want
  // to return from our API.

  const releaseDate = new Date(movieData.release_date);
  const year = releaseDate.getFullYear();
  const month = releaseDate.getMonth();

  const transformedMovie: TransformedMovie = {
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        original_language: movieData.original_language,
        release_month: MONTHS[month],
        release_year: year,
        vote_average: movieData.vote_average,
        overview: movieData.overview,
        backdrop_path: movieData.backdrop_path,
        production_companies: movieData.production_companies,
        status: movieData.status,
        budget: movieData.budget,
        runtime: movieData.runtime,
        revenue: movieData.runtime
    };
  return transformedMovie;
}
