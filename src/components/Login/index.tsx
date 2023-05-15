import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Grid, Card } from "@mui/material";
import { CY_TAGS } from "@/types/cypress_tags";

export const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome to Booked-It!
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              href={"api/auth/login"}
              data-cy={CY_TAGS.LOG_IN_BUTTON}
            >
              Login or Sign Up
            </Button>
          </Box>
        </Grid>
      </Card>
    </Container>
  );
};
