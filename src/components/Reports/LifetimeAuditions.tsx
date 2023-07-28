import Grid from "@mui/material/Grid";
import { AuditionData } from "@/types";

interface LifetimeProps {
  auditions: AuditionData[];
}

export const LifetimeAuditions = (props: LifetimeProps) => {
  const { auditions } = props;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        sx={{
          maxHeight: "30rem",
        }}
      >
        <p>This is your lifetime audition count, my guy: {auditions.length}!</p>
      </Grid>
    </Grid>
  );
};
