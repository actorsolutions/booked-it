"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditions } from "@/apihelpers/auditions";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { LifetimeAuditions } from "@/components/Reports/LifetimeAuditions";
import { AuditionBarChart } from "@/components/Reports/AuditionsByMonth";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { AuditionData } from "@/types";

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
        <h1 data-cy={CY_TAGS.REPORTS.TITLE}>THIS IS THE REPORTS PAGE</h1>
        <DashboardWrapper>
          <LifetimeAuditions auditions={auditions} />
          <AuditionBarChart auditions={auditions} />
        </DashboardWrapper>
      </Container>
    </main>
  );
}
