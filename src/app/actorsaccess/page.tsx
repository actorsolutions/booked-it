"use client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { Container, Grid } from "@mui/material";
import { ActorsAccessImportTable } from "@/components/ActorsAccess";
import CY_TAGS from "@/support/cypress_tags";
import React, { useState } from "react";
import { ConnectForm } from "src/components/ActorsAccess/ConnectForm";

import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";

export default function ActorsAccess() {
  const { ACTORS_ACCESS_IMPORT } = CY_TAGS;
  const [importData, setImportData] = useState([]);

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
            <h1 data-cy={ACTORS_ACCESS_IMPORT.TITLE}>Actors Access</h1>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DashboardWrapper>
                  <ConnectForm setImportData={setImportData} />
                </DashboardWrapper>
              </Grid>
              <Grid item xs={12}>
                <DashboardWrapper>
                  <ActorsAccessImportTable rowData={importData} />
                </DashboardWrapper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </SnackBarProvider>
    </ThemeProvider>
  );
}
