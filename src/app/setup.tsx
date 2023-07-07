import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RootLayout from "@/app/layout";

export const setupApp = (children: ReactNode) => {
  return (
    <RootLayout>
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <main>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
          </main>
        </SnackBarProvider>
      </ThemeProvider>
    </RootLayout>
  );
};
