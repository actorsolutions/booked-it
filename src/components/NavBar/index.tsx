import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
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
    <Toolbar>
      <Grid container data-cy={NAV_BAR.CONTAINER.NAV_BAR}>
        <Grid item xs={10}>
          <Image
            alt="headerLogo"
            src="/assets/header-logo.png"
            width="100"
            height="35"
          />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleLogout} data-cy={NAV_BAR.BUTTONS.LOGOUT}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
};
