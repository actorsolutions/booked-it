import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Paper" {
  // eslint-disable-next-line no-unused-vars
  interface PaperPropsVariantOverrides {
    dashboardWrapper: true;
  }
}

export const theme = createTheme({
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: "dashboardWrapper" },
          style: {
            padding: "1rem",
            backgroundColor: "snow",
            boxShadow:
              "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
          },
        },
      ],
    },
  },
});
