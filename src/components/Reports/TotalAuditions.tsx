import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { Container, Grid } from "@mui/material";
import React from "react";

export const TotalAuditions = () => {
  return (
    <DashboardWrapper>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            Total Auditions - 100
          </Grid>
        </Grid>
      </Container>
    </DashboardWrapper>
  );
};
