import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import { createTheme, ThemeProvider } from "@mui/material";
import Guide from "./pages/Guide";
import './App.css'

// #155E95
// #6A80B9
// #F6C794
// #FFF6B3

// #A6D96A
// #D7191C
// #FDAE61
// #FFFFBF
// #543005

//success
// #328E6E
// #67AE6E
// #90C67C
// #E1EEBC
const theme = createTheme({
  typography: {
    fontFamily: `'Lexend', sans-serif`,
  },
  palette: {
    primary: {
      main: "#0E4D90",
      light: "#1675DA",
      dark: "#0B3E74",
      contrastText: "#EBEBEB",
    },
    secondary: {
      main: "#B6F2D1",
      dark: "#67E09D",
      light: "#DCF9E6",
      contrastText: "#2B2B2B",
    },
    error: {
      main: "#D7191C",
      light: "#FF5252",
      dark: "#A70000",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FF9A00",
      light: "#FFC100",
      dark: "#FF7400",
      contrastText: "#0F0F0F",
    },
    success: {
      main: "#67AE6E",
      light: "#90C67C",
      dark: "#7BAD52",
      contrastText: "#121212",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path=":entity/:type?" element={<Browse />} />
            <Route path="property-guides" element={<Guide />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
