import { ReactNode } from "react";
import { Grid } from "@mui/material";
interface Props {
  children: ReactNode;
}

export const Form = (props: Props) => {
  const { children } = props;
  return (
    <Grid container direction="row">
      {children}
    </Grid>
  );
};
