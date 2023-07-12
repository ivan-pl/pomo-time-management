import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#db6b63",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#db6b63",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#c96d6d",
        },
      },
    },
  },
});

export default theme;
