import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

import { theme } from "../styles/theme";
import Navbar from "../components/navigation/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider resetCSS theme={theme}>
        <Navbar mb="4" />

        <Container>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
