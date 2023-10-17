import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

import CY_TAGS from "@/support/cypress_tags";
import { ProfileForm } from "@/components/ProfileForm/ProfileForm";
interface Props {
  handleClose: () => void;
  open: boolean;
}
export const ProfileFormDialog = (props: Props) => {
  const { handleClose, open } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-form"
      aria-describedby="profile-form-modal"
    >
      <DialogContent>
        <DialogTitle data-cy={CY_TAGS.PROFILE_FORM.TITLE}>
          {"Profile"}
        </DialogTitle>
        <ProfileForm id={0} email="email" />
      </DialogContent>
    </Dialog>
  );
};
