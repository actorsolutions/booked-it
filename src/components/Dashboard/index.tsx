import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { Stack, Box, IconButton, Modal, Typography } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import { AUDITIONS } from "./audition_data";
import { SwipeableRow } from "../SwipeableRow";
import { AuditionRow } from "../AuditionRow";
import { SignUpOrSignIn } from "../../apiCalls/auth";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditions } from "../../apiCalls/auditions";
import { NextApiResponse } from "next";

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
  const [auditions, setAuditions] = useState([]);

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
          <code>{JSON.stringify(AUDITIONS[0], null, 4)}</code>
        </pre>
        <Stack rowGap={1}>
          {auditions.map((audition) => {
            return (
              <SwipeableRow key={audition.id}>
                <AuditionRow audition={audition} />
              </SwipeableRow>
            );
          })}
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
  return <a href={"api/auth/login"}>Login</a>;
};
