import { useState, useEffect } from "react";
import { Login } from "../Login";
import { Container } from "@mui/system";
import { Stack, Box, IconButton, Modal, Typography } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import { SwipeableRow } from "../SwipeableRow";
import { AuditionRow } from "../AuditionRow";
import { SignUpOrSignIn } from "@/apihelpers/auth";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditions } from "@/apihelpers/auditions";
import { Audition } from "@/types";
import {CY_TAGS} from "@/types/cypress_tags";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
};

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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a Modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description in a Modal
            </Typography>
          </Box>
        </Modal>
      </Container>
    );
  }
  return <Login data-cy={ CY_TAGS.LOG_IN_BUTTON } />;
};
