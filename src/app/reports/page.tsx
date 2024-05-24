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
import { ReportsChart } from "@/components/Reports/ReportsChart";

export default function Reports() {
  type Report = {
    total: number;
    topCasting: string;
    topType: string;
    totalByType: {
      totalSubmitted: number;
      totalAuditioned: number;
      totalCallback: number;
      totalBooked: number;
    };
  };
  const mockReport: Report = {
    total: 100,
    topCasting: "Wally Casting",
    topType: "Film",
    totalByType: {
      totalSubmitted: 85,
      totalAuditioned: 10,
      totalCallback: 4,
      totalBooked: 1,
    },
  };
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
                <ReportsCard text={"Total Auditions -" + mockReport.total} />
                <ReportsCard text={"Top Casting -" + mockReport.topCasting} />
                <ReportsCard text={"Top Type - " + mockReport.topType} />
                <DashboardWrapper>
                  <Container>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        From - To
                        <Grid item xs={12} sm={8}>
                          <p>{`Out of ${mockReport.total} Archived Auditions`}</p>
                          <p>{`${mockReport.totalByType.totalSubmitted} are Submitted`}</p>
                          <p>{`${mockReport.totalByType.totalAuditioned} are Auditioned`}</p>
                          <p>
                            {`${mockReport.totalByType.totalCallback} were called
                            back`}
                          </p>
                          <p>
                            {`${mockReport.totalByType.totalBooked} were booked`}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ReportsChart />
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
