import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { Container, Grid } from "@mui/material";
import React from "react";

interface ReportsProps {
  text: string;
}
export const ReportsCard = (props: ReportsProps) => {
  const { text } = props;
  return (
    <DashboardWrapper>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            {text}
          </Grid>
        </Grid>
      </Container>
    </DashboardWrapper>
  );
};
