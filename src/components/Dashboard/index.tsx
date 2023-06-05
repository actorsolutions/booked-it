import React, { useState, useEffect } from "react";
import { Login } from "../Login";
import { Container } from "@mui/system";
import { IconButton, Grid } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import { SignUpOrSignIn } from "@/apihelpers/auth";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditions } from "@/apihelpers/auditions";
import { Audition } from "@/types";
import { PieChart } from "./PieChart";
import { AuditionList } from "@/components/Dashboard/AuditionList";
import CY_TAGS from "@/support/cypress_tags";
import { DashboardWrapper } from "../common/Layout/DashboardWrapper";
import { NeedsAttention } from "@/components/Dashboard/NeedsAttention";
import { LoadingCircle } from "@/components/common/LoadingCircle";
import { AddEditAuditionDialog } from "@/components/common/Dialogs/AddEditAuditionDialog";

const { LANDING_PAGE, AUDITIONS_SECTION } = CY_TAGS;

export const Dashboard = () => {
  const { user } = useUser();
  const [auditions, setAuditions] = useState<Audition[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (user) {
      SignUpOrSignIn().then(() => {
        setLoading(true);
        getAuditions().then((response) => {
          setLoading(false);
          setAuditions(response.auditions);
        });
      });
    }
  }, [user]);

  if (user) {
    return (
      <Container maxWidth="md">
        {loading && <LoadingCircle />}
        {/*Saving this here for Todd*/}
        {/*<pre>*/}
        {/*  <code>{JSON.stringify(auditions[0], null, 4)}</code>*/}
        {/*</pre>*/}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DashboardWrapper>
              <PieChart auditions={auditions} />
            </DashboardWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DashboardWrapper>
              <NeedsAttention
                auditions={auditions}
                setAuditions={setAuditions}
              />
            </DashboardWrapper>
          </Grid>
          <Grid item xs={12}>
            <DashboardWrapper>
              <AuditionList
                auditions={auditions}
                setAuditions={setAuditions}
                buttonPrefix={AUDITIONS_SECTION.BUTTONS.PREFIX}
                listCyTag={AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER}
                rowCyTag={AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <IconButton
                  data-cy={AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION}
                  onClick={handleOpen}
                >
                  <AddCircle fontSize="large" color="primary" />
                </IconButton>
              </div>
              <AddEditAuditionDialog
                auditions={auditions}
                setAuditions={setAuditions}
                handleClose={handleClose}
                open={open}
              />
            </DashboardWrapper>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <Login data-cy={LANDING_PAGE.BUTTONS.LOG_IN} />;
};
