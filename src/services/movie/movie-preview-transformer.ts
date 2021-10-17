import { MoviePreviewResult } from "@app/typings/TMDB";

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

export async function transformMovies(data: MoviePreviewResult[]): Promise<TransformedMovie[]> {
    const transformations = data.map((movie): TransformedMovie => {
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
    
    return transformations;
}