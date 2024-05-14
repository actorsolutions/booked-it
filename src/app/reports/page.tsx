"use client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { Container, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CY_TAGS from "@/support/cypress_tags";
import React from "react";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { ReportsCard } from "@/components/Reports/ReportsCard";

export default function Reports() {
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
              <Container maxWidth={"md"}>
                <h1 data-cy={CY_TAGS.REPORTS.TITLE}>Reports</h1>
                <ReportsCard text={"Total Auditions - 100"} />
                <ReportsCard text={"Top Casting - Wally Casting"} />
                <ReportsCard text={"Top Type - Film"} />
                <DashboardWrapper>
                  <Container>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        From - To
                        <Grid item xs={12} sm={8}>
                          <p>Out of 100 Archived Auditions</p>
                          <p>85 are Submitted</p>
                          <p>10 are Auditioned</p>
                          <p>8 were calledback</p>
                          <p>2 were booked</p>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        Graph
                      </Grid>
                    </Grid>
                  </Container>
                </DashboardWrapper>
              </Container>
            </LocalizationProvider>
          </Container>
        </main>
      </SnackBarProvider>
    </ThemeProvider>
  );
}
