import { extendTheme, ThemeConfig, ThemeOverride, withDefaultColorScheme } from "@chakra-ui/react";

import foundations from "./foundations";
import components from "./components";

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const customTheme: ThemeOverride & { config: ThemeConfig } = {
  ...foundations,
  components,
  config,
};

const theme = extendTheme(customTheme, withDefaultColorScheme({ colorScheme: "primary" }));

export default theme;

export { theme };
