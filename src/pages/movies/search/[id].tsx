import { NextPage } from "next";
import NextLink from "next/link";
import { Stack, HStack, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { GetMoviesSearchResponse } from "@app/services/movie";
import PopularMovieCard from "@app/components/movie/MovieCard";
import MovieSearchBar from "@app/components/movie/MovieSearchBar";
import NavigationButton from "@app/components/movie/NavigationButton";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

async function getMoviesResult(search: string): Promise<GetMoviesSearchResponse> {
    // Data is retrieved from the API layer
    const res = await fetch("/api/movies/search/" + search);

    if (!res.ok) {
    throw new Error("Unable to perform search for movies movies.");
    }

    return await res.json();
}

const MoviesSearchPage: NextPage = () => {
    const router = useRouter();
    const id = router.query.id as string;

    // A query executes to retrieve the data elements that need to be displayed
    const moviesQuery = useQuery<GetMoviesSearchResponse, Error>({
        queryKey: ["movies", id],
        queryFn: () => getMoviesResult(id as string),
    });

    if (moviesQuery.status === "loading" || moviesQuery.status === "idle") {
        return <Text>Loading...</Text>;
    }

    if (moviesQuery.status === "error") {
        return <Text>Error...{moviesQuery.error.message}</Text>;
        console.log(moviesQuery.data);
    }
    
    // A series of components are returned, contained within a Stack element for layout
    return (
        <Stack spacing={8}>
            <MovieSearchBar></MovieSearchBar>

            <Heading size="s">Seach results for: {router.query['id']}</Heading>

            <SimpleGrid columns={6} spacingX={4} spacingY={4}>
                {moviesQuery.data.movies.map((movie) => (
                <PopularMovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path === null ? 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png' : "https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                    original_language={movie.original_language}
                    release_month={movie.release_month}
                    release_year={String(movie.release_year)}
                    vote_average={movie.vote_average}
                />
                ))}
            </SimpleGrid>
            {/* If this is not the last page render nav bars, otherwise show no more results */}
            {!moviesQuery.data.isLast ?
                <HStack space="24px">
                    {/* If this is not the first page, show a back button */}
                    {moviesQuery.data.page != 1 ?
                        <NavigationButton search={String(router.query['id'])} nextPage={Number(moviesQuery.data.page - 1)} navigationDirection="Previous"></NavigationButton>
                    : "N/A"}
                    {/* The next button will show provided the outer if statement holds true */}
                    <NavigationButton search={String(router.query['id'])} nextPage={Number(moviesQuery.data.page + 1)} navigationDirection="Next"></NavigationButton>
                </HStack>
            :   
                <Text>No more results {/* Renders when only one page was returned from the API */}</Text> 
            }
            {/* If this is the last page and more than 1 page in total was returned */}
            {moviesQuery.data.isLast && moviesQuery.data.totalPages > 1 ? <NavigationButton search={String(router.query['id'])} nextPage={Number(moviesQuery.data.page - 1)} navigationDirection="Previous"></NavigationButton> : "N/A"}
        </Stack>
    );
};

export default MoviesSearchPage;