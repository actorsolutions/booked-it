import { ReactNode } from "react";
import Box from "@mui/material/Box";
interface Props {
  children: ReactNode;
}

export const Form = (props: Props) => {
  const { children } = props;
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      {children}
    </Box>
  );
};
