import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
interface Props {
  children: ReactNode;
}

export const Form = (props: Props) => {
  const { children } = props;
  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      {children}
    </Grid>
  );
};
