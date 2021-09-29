import { Box, Input, FormControl, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { MovieSearchPostBody } from "@app/pages/api/movies/";

const Pagination: React.FC = ({  }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClick = (search: string) => {
        router.push(`/movies/search/${search}+&1`);
    };

    const [search, setSearch] = useState("");

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        handleClick(search);
        queryClient.removeQueries("getMovies");
    }

    return (
      <Box as="form" onSubmit={onSubmit} id="search-form" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="2xl" p={4} display={{ md: "flex" }}>
          <FormControl id="search" isRequired>
            <Input placeholder="1" value={search} onChange={(q) => {
                setSearch(q.target.value);
            }} />
          </FormControl>
          
          <Button colorScheme="teal" ml="3" form="search-form" type="submit">Search</Button>
      </Box>
  );
};

export default Pagination;