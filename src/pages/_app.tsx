import type { AppProps } from "next/app";
import { Box, ChakraProvider, Container, Flex } from "@chakra-ui/react";
import { Provider as NextAuthProvider } from "next-auth/client";

import { theme } from "../styles/theme";
import Navbar from "../components/navigation/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthProvider session={pageProps.session}>
        <ChakraProvider resetCSS theme={theme}>
          <Flex flexDir="column" minH="100vh">
            <Navbar mb="4" />

            <Container flexGrow={1}>
              <Component {...pageProps} />
            </Container>

            <Box bg="primary.900" color="white" textAlign="center" mt="8" py="8">
              ASD Assessment - Friday Group 4
            </Box>
          </Flex>
        </ChakraProvider>
      </NextAuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
