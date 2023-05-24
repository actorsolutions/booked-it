import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Login } from "../Login";
import { Container } from "@mui/system";
import { Stack, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircle from "@mui/icons-material/AddCircle";
import { SwipeableRow } from "../SwipeableRow";
import { AuditionRow } from "../AuditionRow";
import { SignUpOrSignIn } from "@/apihelpers/auth";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditions } from "@/apihelpers/auditions";
import { Audition } from "@/types";
import { AuditionForm } from "@/components/AuditionForm";
import { Pie } from "react-chartjs-2";

import CY_TAGS from "@/support/cypress_tags";
import Grid from "@mui/material/Grid";

const { LANDING_PAGE, AUDITIONS_SECTION } = CY_TAGS;

export const Dashboard = () => {
  const { user } = useUser();
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [auditions, setAuditions] = useState<Audition[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const chartAuditions = (auditions: Audition[]) => {
    const pieChartLabel = "Type Breakdown";
    const typeCount: number[] = [];
    const pieLabels: string[] = [];
    const capitalize = (text: string): string =>
      (text && text[0].toUpperCase() + text.slice(1)) || "";

    auditions.forEach((audition) => {
      const label = capitalize(audition.type);
      // Check to see if label exists, add if not.
      if (!pieLabels.includes(label)) {
        pieLabels.push(capitalize(label));
        // Add count of each label to data obj
        const filterByType = auditions.filter(
          (filteredAudition) => filteredAudition.type === audition.type
        );
        typeCount.push(filterByType.length);
      }
    });

    const pieChartData = {
      labels: pieLabels,
      datasets: [
        {
          label: pieChartLabel,
          data: typeCount,
          backgroundColor: [
            "rgba(50, 150, 132, 1)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 25, 100, 0.2)",
          ],
          borderColor: [
            "rgba(15, 10, 222, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 5, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
      options: {
        legends: {
          display: true,
        },
      },
    };
    return { pieChartData };
  };

  useEffect(() => {
    SignUpOrSignIn().then(() => {
      getAuditions().then((response) => {
        setAuditions(response.auditions);
      });
    });
  }, [user]);

  if (user) {
    const { pieChartData } = chartAuditions(auditions);
    return (
      <Container maxWidth="md">
        <a href={"/api/auth/logout"}>Logout</a>

        {/*<pre>*/}
        {/*  <code>{JSON.stringify(auditions[0], null, 4)}</code>*/}
        {/*</pre>*/}

        <Stack
          rowGap={1}
          data-cy={AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} m={12}>
              <Pie data-cy={LANDING_PAGE.GRAPH.PIE_CHART} data={pieChartData} />
            </Grid>
          </Grid>

          {auditions.length === 0 ? (
            <p>No Auditions Added</p>
          ) : (
            auditions.map((audition: Audition, index: number) => {
              return (
                <SwipeableRow key={audition.id}>
                  <AuditionRow audition={audition} index={index} />
                </SwipeableRow>
              );
            })
          )}
        </Stack>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton
            data-cy={AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION}
            onClick={handleOpen}
          >
            <AddCircle fontSize="large" color="primary" />
          </IconButton>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DialogContent>
            <DialogTitle> Add Audition</DialogTitle>
            <AuditionForm
              auditions={auditions}
              setAuditions={setAuditions}
              handleClose={handleClose}
            />
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
  return <Login data-cy={LANDING_PAGE.BUTTONS.LOG_IN} />;
};
