import React from "react";
import Home from "./page";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";

export const setupApp = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
};
