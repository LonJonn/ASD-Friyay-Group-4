import { Box, Input, FormControl, Select, FormHelperText, IconButton, Stack, FormLabel } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { genreData } from "@app/components/movie/genres";
import { certifactionData } from "@app/components/movie/certifactions";
import { SearchIcon } from "@chakra-ui/icons";

const DiscoverBar: React.FC = ({  }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    var genresSelected: string | string[] = [];

    {/* The handleClick procedure creates a new search parameter and pushes users onto a new page */}
    const handleClick = (certification: string, sortMethod: string, year: string ) => {
      if (sortMethod.length === 0) {
        sortMethod = "popularity.desc";
      }

      if (certification.length > 0) {
        router.push(`/movies/discover/with_genres=${genresSelected.toString()}&certification.lte=${certification}&certification_country=AU&sort_by=${sortMethod}`);
      }

      // Default search criteria
      else {
        router.push(`/movies/discover/with_genres=${genresSelected.toString()}&certification.lte=PG&certification_country=AU&sort_by=${sortMethod}`);
      }
      
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      var value = Array.from(e.target.selectedOptions, option => option.value)
      genresSelected = value
    }

    const [genres, setGenres] = useState("");
    const [certification, setCertification] = useState("");
    const [sortMethod, setSortMethod] = useState("");
    const [year, setYear] = useState("");

    async function onSubmit(event: React.FormEvent) {
      event.preventDefault();

      {/* On submission of the form, the handleClick procuredure is executed */}
      handleClick(certification, sortMethod, year);

      {/* Remove Query is executed to clear previous search results from memory */}
      queryClient.invalidateQueries(["movies"]);
    }

    {/* The movie search bar is composed of two form elements contained within a box element that is the form parent */}
    {/* As soon as any form control element is updated, the in-memory value is also updated */}
    return (
      <Box as="form" onSubmit={onSubmit} id="search-form" borderWidth="1px" borderRadius="lg" boxShadow="2xl" p={4} display={{ md: "flex" }} height="15em">
        <Stack direction="row">

          <FormControl isRequired>
            <FormLabel>Genres</FormLabel>
            <Select
              height="10em"
              multiple
              iconSize="0"
              onChange={(g) => handleGenreChange(g)}
              >
              {genreData.map(genre => <option key={genre.code} value={genre.code}>{genre.name}</option>)}
            </Select>
            <FormHelperText>Select one more genres</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Certifications</FormLabel>
            <Select
              onChange={(c) => setCertification(c.target.value)}
              defaultValue="PG"
            >
              {certifactionData.map(cert => <option key={cert.code} value={cert.code}>{cert.certification}</option>)}
            </Select>
            <FormHelperText>[OPTIONAL] Select a maximum certification level</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Sort Results</FormLabel>
            <Select 
              onChange={(s) => setSortMethod(s.target.value)}
            >
              <option value="popularity.desc">Popularity descending</option>
              <option value="popularity.asc">Popularity ascending</option>
              <option value="primary_release_date.desc">Release date descending</option>
              <option value="primary_release_date.asc">Release date ascending</option>
            </Select>
            <FormHelperText>Select a sorting method</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Year Limit</FormLabel>
            <Input placeholder="year (optional)" value={year} ml="1" type="number" onChange={(y) => {
                setYear(y.target.value);
              }} />
            <FormHelperText>Limit searches to a particular year</FormHelperText>
          </FormControl>
          
          <IconButton colorScheme="teal" ml="3" form="search-form" type="submit" icon={<SearchIcon/>} aria-label="Search database"/>
        </Stack>
          
      </Box>
  );
};

export default DiscoverBar;