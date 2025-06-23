import { createTheme } from "@mui/material";

/**
 * Custom Material-UI theme configuration.
 *
 * @constant
 * @type {import('@mui/material/styles').Theme}
 * @property {object} palette - The color palette for the theme.
 * @property {object} palette.primary - Primary color configuration.
 * @property {string} palette.primary.main - Main primary color (#1760a5).
 * @property {string} palette.primary.light - Light variant of primary color (skyblue).
 * @property {object} palette.secondary - Secondary color configuration.
 * @property {string} palette.secondary.main - Main secondary color (#15c630).
 * @property {object} palette.otherColor - Additional custom color.
 * @property {string} palette.otherColor.main - Main value for custom color (#999).
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1760a5",
      light: "skyblue",
    },
    secondary: {
      main: "#15c630",
    },
    otherColor: {
      main: "#999",
    },
  },
});
