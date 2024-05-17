import React, { ReactNode } from "react";
import Paper from "@mui/material/Paper";

interface Props {
  children: ReactNode;
}
export const DashboardWrapper = ({ children }: Props) => {
  return (
    <Paper className={"m-2"} variant={"dashboardWrapper"}>
      {children}
    </Paper>
  );
};
