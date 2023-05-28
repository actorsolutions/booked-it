import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export const LoadingCircle = () => {
  return (
    <CircularProgress
      size={24}
      sx={{
        color: "blue",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-12px",
        marginLeft: "-12px",
      }}
    />
  );
};
