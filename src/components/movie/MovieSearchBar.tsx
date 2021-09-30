import { Box, Input, FormControl, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { MovieSearchPostBody } from "@app/pages/api/movies/";

const SearchBar: React.FC = ({  }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClick = (search: string, year: string) => {
      if (year.length > 0) {
        router.push(`/movies/search/${search}&year=${year}`);
      }

      else {
        router.push(`/movies/search/${search}`);
      }
      
    };

    const [search, setSearch] = useState("");
    const [year, setYear] = useState("");

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        handleClick(search, year);
        queryClient.removeQueries("getMovies");
    }

    return (
      <Box as="form" onSubmit={onSubmit} id="search-form" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl" p={4} display={{ md: "flex" }}>
          <FormControl id="search" isRequired>
            <Input placeholder="Enter movie name" value={search} onChange={(q) => {
                setSearch(q.target.value);
            }} />
          </FormControl>

          <FormControl id="year">
            <Input placeholder="year limit (optional)" value={year} ml="1" onChange={(y) => {
                setYear(y.target.value);
            }} />
          </FormControl>
          
          <Button colorScheme="teal" ml="3" form="search-form" type="submit">Search</Button>
      </Box>
  );
};

export default SearchBar;