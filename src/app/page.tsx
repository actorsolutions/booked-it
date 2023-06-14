"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Dashboard } from "@/components/Dashboard";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import React from "react";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <SnackBarProvider>
          <main>
            <Container
              id={"MainContainer"}
              maxWidth={false}
              sx={{
                minHeight: "100vh",
                bgcolor: "#caccce",
                mt: "1rem",
                pb: "2rem",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Dashboard />
              </LocalizationProvider>
            </Container>
          </main>
        </SnackBarProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
