import { Card, Grid } from "@mui/material";
import LensIcon from "@mui/icons-material/Lens";
import { Audition, Casting } from "@/types";

interface AuditionRowProps {
  audition: Audition;
}

export const AuditionRow = ({ audition }: AuditionRowProps) => {
  const statusColor = (status: string): "success" | "info" => {
    return status === "auditioned" ? "success" : "info";
  };
  const casting = audition.casting ? (audition.casting as Array<Casting>) : [];

  return (
    <Card
      sx={{
        alignItems: "center",
        pl: "4px",
        backgroundColor: "white",
        display: "flex",
        minHeight: "4.5rem",
      }}
      key={audition.id}
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <LensIcon color={statusColor(audition.status)} fontSize="large" />
        </Grid>
        <Grid item xs={7}>
          <div> Project: {audition.project} </div>
        </Grid>
        <Grid item md={3}>
          <div>{casting.length > 0 ? casting[0].name : undefined}</div>
        </Grid>
        <Grid item xs={2}>
          <div style={{ justifyContent: "flex-end" }}>
            {new Date(audition.date * 1000).toLocaleDateString("en", {
              dateStyle: "short",
            })}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};
