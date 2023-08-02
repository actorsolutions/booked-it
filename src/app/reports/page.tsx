"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditions } from "@/apihelpers/auditions";
import { Container, Grid } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { LifetimeAuditions } from "@/components/Reports/LifetimeAuditions";
import { AuditionBarChart } from "@/components/Reports/AuditionsBarChart";
// import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { AuditionData } from "@/types";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";

export default function Reports() {
  const { user } = useUser();
  const [auditions, setAuditions] = useState<AuditionData[]>([]);

  useEffect(() => {
    if (user) {
      getAuditions()
        .then((response) => {
          setAuditions(response.auditions);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DashboardWrapper>
              <LifetimeAuditions auditions={auditions} />
            </DashboardWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DashboardWrapper>
              <AuditionBarChart auditions={auditions} />
            </DashboardWrapper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
