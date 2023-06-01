import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { Paper, IconButton } from "@mui/material";
import { Casting } from "@/types";

interface Props {
  name: string;
  casting: Casting[];
  // eslint-disable-next-line no-unused-vars
  onDelete: (index: number) => void;
}
export const CastingRow = (props: Props) => {
  const { casting, onDelete } = props;
  const handleDelete = (index: number) => {
    onDelete(index);
  };
  return (
      <>
        {casting.map((person, index) => (
            <Paper key={index}>
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
      </>
  );
};
