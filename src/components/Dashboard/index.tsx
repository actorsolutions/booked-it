import { useState, useEffect } from "react";
import { Login } from "../Login";
import { Container } from "@mui/system";
import { Stack, IconButton, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircle from "@mui/icons-material/AddCircle";
import { SwipeableRow } from "../SwipeableRow";
import { AuditionRow } from "../AuditionRow";
import { SignUpOrSignIn } from "@/apihelpers/auth";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditions } from "@/apihelpers/auditions";
import { Audition } from "@/types";
import { AuditionForm } from "@/components/AuditionForm";
import { PieChart } from "./PieChart";
import CY_TAGS from "@/support/cypress_tags";
import { DashboardWrapper } from "../common/Layout/DashboardWrapper";
import { NeedsAttention } from "@/components/Dashboard/NeedsAttention";

const { LANDING_PAGE, AUDITIONS_SECTION } = CY_TAGS;

export const Dashboard = () => {
  const { user } = useUser();
  const [auditions, setAuditions] = useState<Audition[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    SignUpOrSignIn().then(() => {
      getAuditions().then((response) => {
        setAuditions(response.auditions);
      });
    });
  }, [user]);

  if (user) {
    return (
      <Container maxWidth="md">
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
              <NeedsAttention auditions={auditions} />
            </DashboardWrapper>
          </Grid>
          <Grid item xs={12}>
            <DashboardWrapper>
              <Stack
                rowGap={3}
                data-cy={AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER}
              >
                <Typography variant="overline">Auditions</Typography>

                {auditions.length === 0 ? (
                  <p>No Auditions Added</p>
                ) : (
                  auditions.map((audition: Audition, index: number) => {
                    return (
                      <SwipeableRow key={audition.id}>
                        <AuditionRow audition={audition} index={index} />
                      </SwipeableRow>
                    );
                  })
                )}
              </Stack>
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
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <DialogContent>
                  <DialogTitle> Add Audition</DialogTitle>
                  <AuditionForm
                    auditions={auditions}
                    setAuditions={setAuditions}
                    handleClose={handleClose}
                  />
                </DialogContent>
              </Dialog>
            </DashboardWrapper>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <Login data-cy={LANDING_PAGE.BUTTONS.LOG_IN} />;
};
