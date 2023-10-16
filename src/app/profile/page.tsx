"use client";
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

export default function Profile() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <main></main>
      </SnackBarProvider>
    </ThemeProvider>
  );
}
