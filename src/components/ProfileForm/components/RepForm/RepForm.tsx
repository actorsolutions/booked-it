import { useForm } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";
import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";
import { CompanyInput } from "./CompanyInput";
import { RoleInput } from "./RoleInput";
import { FormValues, FormProps } from "./index";
import React from "react";
import CY_TAGS from "@/support/cypress_tags";
import { ProfileFormData } from "@/components/ProfileForm";

export const RepForm = (props: FormProps<ProfileFormData>) => {
  const { initialRepList, setReps, handleClose } = props;
  const { REP_FORM } = CY_TAGS;
  const {
    control,
    formState: { errors },
    clearErrors,
    getValues,
    trigger,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      reps: initialRepList,
    },
  });

  const customValidation = async (arrayOfFields: fields[]) => {
    return trigger(arrayOfFields as fields[], { shouldFocus: true });
  };

  type fields = "fName" | "lName" | "company" | "role";

  const requiredFields = ["fName", "lName", "role", "company"];

  const handleClick = async () => {
    const { fName, lName, role, company, reps } = getValues();
    if (
      (await customValidation(requiredFields as fields[])) &&
      reps.length < 3
    ) {
      setReps([
        ...reps,
        {
          fName: fName,
          lName: lName,
          company: company,
          role: role,
        },
      ]);

      handleClose();
    }
  };

  return (
    <Grid
      container
      direction="column"
      data-cy={REP_FORM.CONTAINERS.FORM_CONTAINER}
    >
      <Grid item>
        <FirstNameInput control={control} register={register} />
        {errors.fName && (
          <Typography variant="overline">First Name is required!</Typography>
        )}
      </Grid>
      <Grid item>
        <LastNameInput control={control} register={register} />
        {errors.lName && (
          <Typography variant="overline">Last Name is required!</Typography>
        )}
      </Grid>
      <Grid item>
        <CompanyInput control={control} />
      </Grid>
      <Grid item>
        <RoleInput control={control} />
      </Grid>

      <Grid item container justifyContent={"right"}>
        <Button
          onClick={() => {
            clearErrors();
            handleClick();
          }}
          data-cy={REP_FORM.BUTTON.ADD_BUTTON}
        >
          Add Person
        </Button>
      </Grid>
    </Grid>
  );
};
