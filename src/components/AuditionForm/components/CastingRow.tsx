import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Paper } from "@mui/material";

interface Props {
  name: string;
}
export const CastingRow = (props: Props) => {
  const { name } = props;
  return (
    <Paper>
      <PersonIcon />
      {name}
    </Paper>
  );
};
