import { Box, Input, FormControl, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";

const SearchBar: React.FC = ({  }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    {/* The handleClick procedure creates a new search parameter and pushes users onto a new page */}
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

      {/* On submission of the form, the handleClick procuredure is executed */}
      handleClick(search, year);

      {/* Remove Query is executed to clear previous search results from memory */}
      queryClient.invalidateQueries(["movies"]);
    }

    {/* The movie search bar is composed of two form elements contained within a box element that is the form parent */}
    {/* As soon as any form control element is updated, the in-memory value is also updated */}
    return (
      <Box as="form" onSubmit={onSubmit} id="search-form" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl" p={4} display={{ md: "flex" }}>
          <FormControl id="search" isRequired>
            <Input placeholder="Enter movie name" value={search} onChange={(q) => {
              setSearch(q.target.value);
            }} />
          </FormControl>

          <FormControl id="year">
            <Input placeholder="year limit (optional)" value={year} ml="1" type="number" onChange={(y) => {
              setYear(y.target.value);
            }} />
          </FormControl>
          
          <Button colorScheme="teal" ml="3" form="search-form" type="submit">Search</Button>
      </Box>
  );
};

export default SearchBar;