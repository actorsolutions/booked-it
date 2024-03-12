import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { Paper, IconButton } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { Representation } from "@/types/profile";

interface Props {
  reps: Representation[];
  // eslint-disable-next-line no-unused-vars
  setReps: (updatedReps: Representation[]) => void;
  listCyTag: string;
}

export const RepList = (props: Props) => {
  const { reps, setReps, listCyTag } = props;

  const handleDeleteRepsRow = (index: number) => {
    const updatedReps = [...reps];
    reps.splice(index, 1);
    setReps(updatedReps);
  };

  const { AUDITION_FORM } = CY_TAGS;
  return (
    <div data-cy={listCyTag}>
      {reps.length === 0 ? (
        <Paper
          style={{
            border: "none",
            fontStyle: "italic",
            color: "rgba(0, 0, 0, 0.4)",
            paddingLeft: "6px",
          }}
        >
          <p>No Representation Added</p>
        </Paper>
      ) : (
        reps.map((person, index) => (
          <Paper
            key={index}
            data-cy={AUDITION_FORM.CASTING.CASTING_ROW + index}
          >
            <PersonIcon />

            {person.fName + " " + person.lName + " | " + person.role}
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteRepsRow(index)}
              data-cy={AUDITION_FORM.BUTTONS.DELETE_CASTING}
            >
              <CloseIcon />
            </IconButton>
          </Paper>
        ))
      )}
    </div>
  );
};
