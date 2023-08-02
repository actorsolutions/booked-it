"use client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/support/MaterialUITheme";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { Container, Grid, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ActorsAccessImportTable,
  ActorsAccessData,
} from "@/components/ActorsAccess";
import CY_TAGS from "@/support/cypress_tags";
import React, { useEffect, useState } from "react";
import { scrapeAuditions } from "@/apihelpers/actorsAccess";
import {
  UserNameInput,
  FormValues,
  PasswordInput,
  ConnectForm,
} from "src/components/ActorsAccess/ConnectForm";
import { useForm } from "react-hook-form";
import { FormGroupRow } from "@/components/common/Form";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";

export default function ActorsAccess() {
  const { ACTORS_ACCESS_IMPORT } = CY_TAGS;
  const [importData, setImportData] = useState([]);

  // Get Auditions from API
  // useEffect(() => {
  //   scrapeAuditions().then((response) => {
  //     const auditionArray = response.data;
  //     auditionArray.forEach((audition: ActorsAccessData) => {
  //       if (audition.project === "") {
  //         audition.project = "UNKNOWN";
  //       }
  //       // This sets a default type for the data object since we can't get the Type yet from AA.
  //       audition.type = "television";
  //     });
  //     setImportData(auditionArray);
  //   });
  // }, []);

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
              <h1 data-cy={CY_TAGS.REPORTS.TITLE}>Actors Access</h1>
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
