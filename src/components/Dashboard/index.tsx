import React, { useState, useEffect } from "react";
import { Login } from "../Login";
import { Container } from "@mui/system";
import { IconButton, Grid, Typography } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import { SignUpOrSignIn } from "@/apihelpers/auth";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";
import { getAuditions } from "@/apihelpers/auditions";
import { AuditionData } from "@/types";
import { PieChart } from "./PieChart";
import { AuditionList } from "@/components/Dashboard/AuditionList";
import CY_TAGS from "@/support/cypress_tags";
import RESPONSE_MESSAGES from "@/support/response_messages";
import { DashboardWrapper } from "../common/Layout/DashboardWrapper";
import { NeedsAttention } from "@/components/Dashboard/NeedsAttention";
import { LoadingCircle } from "@/components/common/LoadingCircle";
import { AddEditAuditionDialog } from "@/components/common/Dialogs/AddEditAuditionDialog";
import TextField from "@mui/material/TextField";
import { useSnackBar } from "@/context/SnackbarContext";

const { LANDING_PAGE, AUDITIONS_SECTION } = CY_TAGS;
const { AUTH_MESSAGES, AUDITION_MESSAGES } = RESPONSE_MESSAGES;

export const Dashboard = () => {
  const { showSnackBar } = useSnackBar();
  const { user } = useUser();
  const { update: updateSession } = useSession();

  const [auditions, setAuditions] = useState<AuditionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [filterText, setFilterText] = useState("");
  const [filteredArray, setFilteredArray] = useState<AuditionData[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (user) {
      console.log(user);
      SignUpOrSignIn()
        .then(() => {
          setLoading(true);
          getAuditions()
            .then((response) => {
              setAuditions(response.auditions);
              setFilteredArray(response.auditions);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              showSnackBar(AUDITION_MESSAGES.GET_AUDITIONS_FAILURE, "error");
            });
        })
        .catch((error) => {
          console.log(error);
          showSnackBar(AUTH_MESSAGES.SIGNIN_SIGNUP_FAILURE, "error");
        });
    }
    setLoading(false);
  }, [user, updateSession]);

  /**
   * This takes an auditionArray and filters by text for Type,Project and Company and pushes into another
   * 'filtered' Array.
   * @param auditionArray
   * @param filterArray
   * @param filter
   */

  const filterByTypeProjectCompany = (
    auditionArray: AuditionData[],
    filterArray: AuditionData[],
    filter: string
  ) => {
    auditionArray.filter((audition) => {
      if (
        audition.type.includes(filter) ||
        audition.project.includes(filter) ||
        audition.company.includes(filter)
      ) {
        !filterArray.includes(audition) && filterArray.push(audition);
      }
    });
  };

  /**
   * This takes an audition array and filters by Casting name and pushes that audition into  a'filtered' array
   * @param auditionArray
   * @param filterArray
   * @param filter
   */
  const filterByCastingName = (
    auditionArray: AuditionData[],
    filterArray: AuditionData[],
    filter: string
  ) => {
    auditionArray.filter((audition) => {
      audition.casting?.filter((person) => {
        if (person.name?.includes(filter)) {
          !filterArray.includes(audition) && filterArray.push(audition);
        }
      });
    });
  };

  useEffect(() => {
    if (filterText.length > 2) {
      const filterAuditions = () => {
        const returnArray: AuditionData[] = [];
        filterByTypeProjectCompany(auditions, returnArray, filterText);
        filterByCastingName(auditions, returnArray, filterText);
        return returnArray;
      };
      setFilteredArray(filterAuditions);
    } else {
      setFilteredArray(auditions);
    }
  }, [filterText, auditions]);
  if (user) {
    return (
      <Container maxWidth="md">
        {loading && <LoadingCircle />}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DashboardWrapper>
              <PieChart auditions={auditions} />
            </DashboardWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DashboardWrapper>
              <NeedsAttention
                auditions={auditions}
                setAuditions={setAuditions}
              />
            </DashboardWrapper>
          </Grid>
          <Grid item xs={12}>
            <DashboardWrapper>
              <Typography variant="overline" display="block" gutterBottom>
                Auditions
              </Typography>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item sx={{ mb: "2rem" }}>
                  <TextField
                    data-cy={AUDITIONS_SECTION.SEARCH_INPUT}
                    id="filled-search"
                    label="Search..."
                    type="search"
                    variant="outlined"
                    onChange={(e) => {
                      setFilterText(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <AuditionList
                    auditions={filteredArray}
                    setAuditions={setAuditions}
                    buttonPrefix={AUDITIONS_SECTION.BUTTONS.PREFIX}
                    listCyTag={AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER}
                    rowCyTag={AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW}
                  />
                </Grid>
              </Grid>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <IconButton
                  data-cy={AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION}
                  onClick={handleOpen}
                >
                  <AddCircle fontSize="large" color="primary" />
                </IconButton>
              </div>
              <AddEditAuditionDialog
                auditions={auditions}
                setAuditions={setAuditions}
                handleClose={handleClose}
                open={open}
              />
            </DashboardWrapper>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <Login data-cy={LANDING_PAGE.BUTTONS.LOG_IN} />;
};
