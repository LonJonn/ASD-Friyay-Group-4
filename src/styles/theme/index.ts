import {
  extendTheme,
  ThemeConfig,
  ThemeOverride,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import foundations from "./foundations";

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const customTheme: ThemeOverride & { config: ThemeConfig } = {
  ...foundations,
  config,
};

const theme = extendTheme(
  customTheme,
  withDefaultColorScheme({ colorScheme: "primary" })
);

export default theme;

export { theme };
