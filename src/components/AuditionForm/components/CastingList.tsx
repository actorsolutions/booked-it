import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { Paper, IconButton } from "@mui/material";
import { Casting } from "@/types";
import CY_TAGS from "@/support/cypress_tags";

interface Props {
  name: string;
  casting: Casting[];
  // eslint-disable-next-line no-unused-vars
  onDelete: (index: number) => void;
  listCyTag: string
}
export const CastingList = (props: Props) => {
  const { casting, onDelete, listCyTag } = props;
  const handleDelete = (index: number) => {
    onDelete(index);
  };
  const { AUDITION_FORM } = CY_TAGS
  return (
      <div data-cy={listCyTag}>
        {casting.map((person, index) => (
            <Paper key={index} data-cy={AUDITION_FORM.CASTING.CASTING_ROW + index}>
              <PersonIcon />
              {person.name}
              <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
              >
                <CloseIcon />
              </IconButton>
            </Paper>
        ))}
      </div>
  );
};
