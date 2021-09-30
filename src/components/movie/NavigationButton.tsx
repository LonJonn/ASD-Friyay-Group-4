import { Box, Input, FormControl, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { MovieSearchPostBody } from "@app/pages/api/movies/";

interface INavigationButton {
    search: string;
    nextPage: number;
    navigationDirection: string;
}

const NavigationButton: React.FC<INavigationButton> = ({ search, nextPage, navigationDirection }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClick = (search: string) => {
        var newSearch = search.split("&")[0] + "&page=" + nextPage;
        router.push(`/movies/search/${newSearch}`);
    };

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        handleClick(search);
        queryClient.removeQueries("getMovies");
    }

    return (
      <Box as="form" onSubmit={onSubmit} id={navigationDirection + "-form"}>
        <Button colorScheme="teal" ml="3" form={navigationDirection + "-form"} type="submit">
            {navigationDirection} Page
        </Button>
      </Box>
  );
};

export default NavigationButton;