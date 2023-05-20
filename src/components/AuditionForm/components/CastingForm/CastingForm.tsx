import { useForm, useFieldArray } from "react-hook-form";
import { Button, Grid } from "@mui/material";

import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";
import { CompanyInput } from "./CompanyInput";
import { RoleInput } from "./RoleInput";
import { FormValues, FormProps } from "./index";
import React from "react";
import { AuditionFormData } from "@/components/AuditionForm";
export const CastingForm = (props: FormProps<AuditionFormData>) => {
  const { initialCastingList, setCasting, handleClose } = props;
  const { handleSubmit, control, getValues } = useForm<FormValues>({
    defaultValues: {
      casting: initialCastingList,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "casting",
  });
  const handleClick = () => {
    const { company, fName, lName, role, casting } = getValues();
    console.log(getValues());
    const name = fName + " " + lName;
    if (casting.length < 1) {
      setCasting([
        {
          name: name,
          role: role,
          company: company,
        },
      ]);
    }
    handleClose();
  };

  console.log({ initialCastingList });
  return (
    <Grid container direction="column">
      <Grid item>
        <FirstNameInput control={control} />
      </Grid>
      <Grid item>
        <LastNameInput control={control} />
      </Grid>
      <Grid item>
        <CompanyInput control={control} />
      </Grid>
      <Grid item>
        <RoleInput control={control} />
      </Grid>
      <Grid item>
        <Button
          onClick={() => {
            handleClick();
          }}
        >
          Add Person
        </Button>
      </Grid>
    </Grid>
  );
};
