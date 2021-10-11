import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

interface INavigationButton {
    search: string;
    nextPage: number;
    navigationDirection: string;
    endpoint: string;
}

const NavigationButton: React.FC<INavigationButton> = ({ search, nextPage, navigationDirection, endpoint }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    {/* The handleClick procedure creates a new search parameter and pushes users onto a new page */}
    const handleClick = (search: string) => {
        var newSearch : string = "";

        if (search.length > 0) {
           newSearch = search.split("&")[0] + "&page=" + nextPage;
           console.log("search: " + search);
        }

        else {
            newSearch = "page=" + nextPage;
            console.log("here");
        }
        
        router.push(`/movies/${endpoint}/${newSearch}`);
    };

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        {/* On submission of the form, the handleClick procuredure is executed */}
        handleClick(search);
        {/* Remove Query is executed to clear previous search results from memory */}
        
        if (endpoint.match("movies")) {
            queryClient.invalidateQueries(["movies"]);
        }

        else {
            queryClient.invalidateQueries(["nowPlaying"]);
        }
            
    }

    {/* The direction of navigation and button text is set dynamically */}
    {/* The button itself submits a form */}

    return (
      <Box as="form" onSubmit={onSubmit} id={navigationDirection + "-form"}>
        <Button colorScheme="teal" ml="3" form={navigationDirection + "-form"} type="submit">
            {navigationDirection} Page
        </Button>
      </Box>
  );
};

export default NavigationButton;