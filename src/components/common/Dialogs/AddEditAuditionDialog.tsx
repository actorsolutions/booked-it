import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AuditionForm } from "@/components/AuditionForm";
import React, { Dispatch, SetStateAction } from "react";
import { Audition } from "@/types";

interface Props {
  id?: number;
  auditions: Audition[];
  setAuditions: Dispatch<SetStateAction<Audition[]>>;
  handleClose: () => void;
  open: boolean;
}
export const AddEditAuditionDialog = (props: Props) => {
  const { id, auditions, setAuditions, handleClose, open } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="audition-form"
      aria-describedby="audition-form-modal"
    >
      <DialogContent>
        <DialogTitle> Add Audition</DialogTitle>
        <AuditionForm
          auditions={auditions}
          setAuditions={setAuditions}
          handleClose={handleClose}
          id={id}
        />
      </DialogContent>
    </Dialog>
  );
};
