"use client";
import "bootstrap/dist/css/bootstrap.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "@/components/NavBar";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { theme } from "@/support/MaterialUITheme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { SnackBarProvider } from "@/context/SnackbarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <title>Booked It</title>
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackBarProvider>
              <SessionProvider>
                <UserProvider>
                  <NavBar />
                  {children}
                  <Container>
                    <Typography variant="subtitle1">Booked-It MVP</Typography>
                  </Container>
                </UserProvider>
              </SessionProvider>
            </SnackBarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
