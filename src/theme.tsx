"use client"
import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#fff",
      light: "#f5f5f5",
      dark: "#E4E7E9"
    },
    secondary: {
      main: "#db4444",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
});

export default theme;
