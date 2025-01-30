import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",   
      light: "#64b5f6",
      dark: "#1976d2",
    },
    secondary: {
      main: "#f50057",   
      light: "#ff4081",
      dark: "#c51162",
    },
    background: {
      default: "#fafafa",  
      paper: "#ffffff",     
    },
    text: {
      primary: "#212121",  
      secondary: "#757575", 
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  }
});

export default theme;