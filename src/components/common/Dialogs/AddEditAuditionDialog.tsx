import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AuditionForm } from "@/components/AuditionForm";
import React, { Dispatch, SetStateAction } from "react";
import { AuditionData } from "@/types";
import CY_TAGS from "@/support/cypress_tags";
interface Props {
  audition?: AuditionData;
  auditions: AuditionData[];
  setAuditions: Dispatch<SetStateAction<AuditionData[]>>;
  handleClose: () => void;
  open: boolean;
}
export const AddEditAuditionDialog = (props: Props) => {
  const { audition, auditions, setAuditions, handleClose, open } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="audition-form"
      aria-describedby="audition-form-modal"
    >
      <DialogContent>
        <DialogTitle data-cy={CY_TAGS.AUDITION_FORM.TITLE}>
          {audition ? "Edit Audition" : "Add Audition"}
        </DialogTitle>
        <AuditionForm
          auditions={auditions}
          setAuditions={setAuditions}
          handleClose={handleClose}
          audition={audition}
        />
      </DialogContent>
    </Dialog>
  );
};
