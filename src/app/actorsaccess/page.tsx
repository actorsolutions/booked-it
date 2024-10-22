"use client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { Container, Grid, Typography } from "@mui/material";
import { ActorsAccessImportTable } from "@/components/ActorsAccess";
import CY_TAGS from "@/support/cypress_tags";
import React, { useState } from "react";
import { ConnectForm } from "src/components/ActorsAccess/ConnectForm";

import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Profile } from "@/types";
import { decryptEntry } from "@/models/utils/UserUtils";

export default function ActorsAccess() {
  const { ACTORS_ACCESS_IMPORT } = CY_TAGS;
  const [importData, setImportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useUser();
  const profile: Profile | undefined = user;
  const UN = profile?.AA_UN ? (decryptEntry(profile.AA_UN) as string) : "";
  const PW = profile?.AA_PW ? (decryptEntry(profile.AA_PW) as string) : "";

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
                  <ConnectForm
                    setImportData={setImportData}
                    setLoading={setLoading}
                    UN={UN}
                    PW={PW}
                    profileLoading={isLoading}
                  />
                </DashboardWrapper>
              </Grid>
              <Grid item xs={12}>
                <DashboardWrapper>
                  <Typography variant="h5">Important Note!</Typography>
                  <Typography variant="body1" gutterBottom>
                    Make sure you edit the type of each entry!
                  </Typography>
                  {loading ? (
                    <CircularProgress
                      data-cy={ACTORS_ACCESS_IMPORT.LOADING_CIRCLE}
                      color="success"
                    />
                  ) : (
                    <ActorsAccessImportTable rowData={importData} />
                  )}
                </DashboardWrapper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </SnackBarProvider>
    </ThemeProvider>
  );
}
