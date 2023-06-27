import { useForm } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";
import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";
import { CompanyInput } from "./CompanyInput";
import { RoleInput } from "./RoleInput";
import { FormValues, FormProps } from "./index";
import React from "react";
import CY_TAGS from "@/support/cypress_tags";
import { AuditionFormData } from "@/components/AuditionForm";

export const CastingForm = (props: FormProps<AuditionFormData>) => {
  const { initialCastingList, setCasting, handleClose } = props;
  const { CASTING_FORM } = CY_TAGS;
  const {
    control,
    formState: { errors },
    clearErrors,
    getValues,
    trigger,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      casting: initialCastingList,
    },
  });

  const customValidation = async (arrayOfFields: fields[]) => {
    return trigger(arrayOfFields as fields[], { shouldFocus: true });
  };

  type fields = "fName" | "lName" | "company" | "role";

  const requiredFields = ["fName", "lName"];

  const handleClick = async () => {
    const { company, fName, lName, role, casting } = getValues();
    const name = fName + " " + lName;
    if (
      (await customValidation(requiredFields as fields[])) &&
      casting.length < 3
    ) {
      setCasting([
        ...casting,
        {
          name: name,
          role: role,
          company: company,
        },
      ]);
      handleClose();
    }
  };

  return (
    <Grid
      container
      direction="column"
      data-cy={CASTING_FORM.CONTAINERS.CASTING_CONTAINER}
    >
      <Grid item>
        <FirstNameInput control={control} register={register} />
        {errors.fName && (
          <Typography variant="overline">First Name is required!</Typography>
        )}
      </Grid>
      <Grid item>
        <LastNameInput
          control={control}
          register={register}
          data-cy={CASTING_FORM.INPUTS.LAST_NAME}
        />
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
          data-cy={CASTING_FORM.BUTTONS.ADD_PERSON}
        >
          Add Person
        </Button>
      </Grid>
    </Grid>
  );
};
