"use client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ActorsAccessGrid } from "@/components/Tables/ActorsAccess";

export default function ActorsAccess() {
  return (
    <ThemeProvider theme={theme}>
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
              <ActorsAccessGrid />
            </LocalizationProvider>
          </Container>
        </main>
      </SnackBarProvider>
    </ThemeProvider>
  );
}
