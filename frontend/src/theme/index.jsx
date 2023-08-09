import { extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

const { Button } = chakraTheme.components;
// These are the default breakpoints
const breakpoints = {
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "80em", // 1280px
  "2xl": "96em", // 1536px
};
const theme = extendBaseTheme({
  components: {
    Button,
  },
  // breakpoints,
});

export default theme;
