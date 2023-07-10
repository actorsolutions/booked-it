import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { Button, Typography, Link } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import CY_TAGS from "@/support/cypress_tags";
import Image from "next/image";

export const NavBar = () => {
  const { user } = useUser();
  const { NAV_BAR } = CY_TAGS;

  const handleLogout = () => {
    window.location = "/api/auth/logout" as unknown as Location;
  };
  if (!user) {
    return null;
  }

  return (
    <Toolbar sx={{ display: "flex" }}>
      <Grid container data-cy={NAV_BAR.CONTAINER.NAV_BAR} alignItems="center">
        <Grid item>
          <Image
            alt="headerLogo"
            src="/assets/header-logo.png"
            width="100"
            height="35"
          />
        </Grid>
        <Grid item sx={{ marginLeft: "16px" }}>
          <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item>
              <Link href={"/"} underline="none" color="inherit">
                Dashboard
              </Link>
            </Grid>
            <Grid item>
              <Link href={"/reports"} underline="none" color="inherit">
                <Typography>Reports</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} />{" "}
        <Grid item>
          <Button onClick={handleLogout} data-cy={NAV_BAR.BUTTONS.LOGOUT}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
};
