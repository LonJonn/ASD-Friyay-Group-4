import axios from "axios"
import { Movie } from '@app/typings/TMDB'

export type GetPopularMoviesResponse = Movie[];

export async function getPopularMovies(this: any): Promise<GetPopularMoviesResponse> {
    const response = await axios.get<Movie[]>('https://api.themoviedb.org/3/movie/popular?api_key=e4fa39bf6f208cb92054054b1c0398d4&language=en-US&page=1');
    
    const movies = response.data.results;

    const processedMovies = movies.map((movie: { id: any; title: any; poster_path: any; release_date: any; original_language: any; adult: any }): Movie => {
        
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var year = movie.release_date?.split("-")[0];
        var month = Number(movie.release_date?.split("-")[1]) - 1;

        return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            original_language: movie.original_language,
            adult: movie.adult,
            release_month: months[month],
            release_year: year
        };
    });

    return processedMovies;
}