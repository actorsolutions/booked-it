import React, { ReactNode } from "react";
import Paper from "@mui/material/Paper";

interface Props {
  children: ReactNode;
}
export const DashboardWrapper = ({ children }: Props) => {
  return (
    <Paper elevation={5} sx={{ p: "1rem", bgcolor: "snow", mb: "2rem" }}>
      {children}
    </Paper>
  );
};
