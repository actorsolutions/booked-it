import Container from "@mui/material/Container";
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import {Button, Grid} from "@mui/material";

export const Login = () => {
  return (
    <Container component="main" maxWidth='xs'  >
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
            <Box sx={{
                marginTop:8,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",

            }}>
                <Typography component="h1" variant="h5">
                    Welcome to Booked-It!
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    href={"api/auth/login"}
                >Login or Sign Up</Button>

            </Box>
        </Grid>

    </Container>
  );
};
