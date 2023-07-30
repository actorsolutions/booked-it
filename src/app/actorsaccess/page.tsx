"use client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ActorsAccessGrid } from "@/components/Tables/ActorsAccess";
import { useEffect, useState } from "react";
import { scrapeAuditions } from "@/apihelpers/actorsAccess";

export default function Reports() {
  const [data, setData] = useState();
  useEffect(() => {
    scrapeAuditions().then((auditions) => {
      console.log(auditions);
      setData(auditions.data);
    });
  }, []);
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
              <ActorsAccessGrid data={data} />
            </LocalizationProvider>
          </Container>
        </main>
      </SnackBarProvider>
    </ThemeProvider>
  );
}
