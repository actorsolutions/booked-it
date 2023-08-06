import { Button, Container, Grid } from "@mui/material";
import { UserNameInput } from "@/components/ActorsAccess/ConnectForm/UserNameInput";
import { PasswordInput } from "@/components/ActorsAccess/ConnectForm/PasswordInput";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "@/components/ActorsAccess/ConnectForm/index";
import CY_TAGS from "@/support/cypress_tags";
import { scrapeAuditions } from "@/apihelpers/actorsAccess";
import { ActorsAccessData } from "@/components/ActorsAccess";
import { useSnackBar } from "@/context/SnackbarContext";
import RESPONSE_MESSAGES from "@/support/response_messages";

interface Props {
  setImportData: Dispatch<SetStateAction<never[]>>;
}
export const ConnectForm = (props: Props) => {
  const { setImportData } = props;
  const { showSnackBar } = useSnackBar();
  const { ACTORS_ACCESS_MESSAGES } = RESPONSE_MESSAGES;

  const { ACTORS_ACCESS_IMPORT } = CY_TAGS;
  const { control, getValues, register } = useForm<FormValues>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const handleClick = () => {
    const { userName, password } = getValues();
    scrapeAuditions(userName, password)
      .then((response) => {
        const auditionArray = response.data;
        auditionArray.forEach((audition: ActorsAccessData) => {
          if (audition.project === "") {
            audition.project = "UNKNOWN";
          }
          // This sets a default type for the data object since we can't get the Type yet from AA.
          audition.type = "television";
        });
        setImportData(auditionArray);
      })
      .catch((error) => {
        console.log(error);
        showSnackBar(ACTORS_ACCESS_MESSAGES.LOGIN_FAILURE, "error");
      });
  };
  return (
    <Container data-cy={ACTORS_ACCESS_IMPORT.USER_FORM.USER_FORM_CONTAINER}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        wrap="nowrap"
      >
        <Grid item xs={6}>
          <UserNameInput control={control} register={register} />
        </Grid>
        <Grid item xs={6}>
          <PasswordInput control={control} register={register} />
        </Grid>
        <Grid item xs={6}>
          <Button
            data-cy={ACTORS_ACCESS_IMPORT.BUTTONS.LINK_BUTTON}
            size="large"
            variant="contained"
            color="success"
            onClick={handleClick}
            type={"submit"}
          >
            Link!
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
