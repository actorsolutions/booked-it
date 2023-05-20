import { useState, useEffect } from "react";
import { Login } from "../Login";
import { Container } from "@mui/system";
import { Stack, IconButton } from "@mui/material";
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
import CY_TAGS from "@/types/cypress_tags";

const { LANDING_PAGE } = CY_TAGS;

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
        <a href={"/api/auth/logout"}>Logout</a>

        <pre>
          <code>{JSON.stringify(auditions[0], null, 4)}</code>
        </pre>
        <Stack rowGap={1}>
          {auditions.length === 0 ? (
            <p>No Auditions Added</p>
          ) : (
            auditions.map((audition: Audition) => {
              return (
                <SwipeableRow key={audition.id}>
                  <AuditionRow audition={audition} />
                </SwipeableRow>
              );
            })
          )}
        </Stack>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton onClick={handleOpen}>
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
      </Container>
    );
  }
  return <Login data-cy={LANDING_PAGE.BUTTONS.LOG_IN} />;
};
