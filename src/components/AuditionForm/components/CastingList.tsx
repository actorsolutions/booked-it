import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { Paper, IconButton } from "@mui/material";
import { Casting } from "@/types";
import CY_TAGS from "@/support/cypress_tags";

interface Props {
  casting: Casting[];
  // eslint-disable-next-line no-unused-vars
  setCasting: (updatedCasting: Casting[]) => void;
  listCyTag: string
}

export const CastingList = (props: Props) => {
  const { casting, setCasting, listCyTag } = props;

  const handleDeleteCastingRow = (index: number) => {
    const updatedCasting = [...casting];
    updatedCasting.splice(index, 1);
    setCasting(updatedCasting);
  };

  const { AUDITION_FORM } = CY_TAGS;

  return (
      <div data-cy={listCyTag}>
        {casting.length === 0 ? (
            <Paper
                style={{
                  border: "none",
                  fontStyle: "italic",
                  color: "rgba(0, 0, 0, 0.4)",
                  paddingLeft: "6px"
                }}
            >
              <p>No Casting Added</p>
            </Paper>
        ) : (
            casting.map((person, index) => (
                <Paper key={index} data-cy={AUDITION_FORM.CASTING.CASTING_ROW + index}>
                  <PersonIcon />
                  {person.name}
                  <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteCastingRow(index)}
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
