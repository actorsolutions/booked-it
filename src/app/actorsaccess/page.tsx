"use client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h1 data-cy={ACTORS_ACCESS_IMPORT.TITLE}>Actors Access</h1>
              <DashboardWrapper>
                <ConnectForm setImportData={setImportData} />
              </DashboardWrapper>
              <DashboardWrapper>
                <ActorsAccessImportTable rowData={importData} />
              </DashboardWrapper>
            </LocalizationProvider>
          </Container>
        </main>
      </SnackBarProvider>
    </ThemeProvider>
  );
}
