import { NextPage } from "next";
import NextLink from "next/link";
import { Stack, SimpleGrid, Heading, Text, Button } from "@chakra-ui/react";
import { getMovies, GetMoviesSearchResponse } from "@app/services/movie";
import PopularMovieCard from "@app/components/movie/MovieCard";
import MovieSearchBar from "@app/components/movie/MovieSearchBar";
import { useQuery } from "react-query";
import { useRouter } from "next/router";


async function getMoviesResult(search: string): Promise<GetMoviesSearchResponse> {
    const res = await fetch("/api/movies/search/" + search);

    if (!res.ok) {
    throw new Error("Unable to perform search for movies movies.");
    }

    return await res.json();
}

async function getNextPage(search: string, page: number): Promise<GetMoviesSearchResponse> {
    const res = await fetch("/api/movies/search/" + search + "&page=" + page);

    if (!res.ok) {
    throw new Error("Unable to perform search for movies movies.");
    }

    return await res.json();
}


const MoviesSearchPage: NextPage = () => {
    const router = useRouter();
    console.log(router.pathname);

    console.log("Search is " + router.query['id']);

    const query = useQuery<GetMoviesSearchResponse, Error>({
        queryKey: "getMovies",
        queryFn: () => getMoviesResult(String(router.query['id'])),
    });

    if (query.status === "loading" || query.status === "idle") {
        return <Text>Loading...</Text>;
    }

    if (query.status === "error") {
        return <Text>Error...{query.error.message}</Text>;
        console.log(query.data);
    }

    
    return (
        <Stack spacing={8}>
            <MovieSearchBar></MovieSearchBar>

            <Heading size="s">Seach results for: {router.query['id']}</Heading>

            <SimpleGrid columns={6} spacingX={4} spacingY={4}>
                {query.data.map((movie) => (
                <PopularMovieCard
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
        </Stack>
    );
};

export default MoviesSearchPage;