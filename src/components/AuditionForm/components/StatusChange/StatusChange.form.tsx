import React, { useEffect, useState } from "react";
import {
  EMPTY_STATUS_ROW,
  FormValues,
} from "@/components/AuditionForm/components/StatusChange/index";
import { Grid, IconButton, Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { Status } from "./Status";
import AddCircle from "@mui/icons-material/AddCircle";
export const StatusChangeForm = () => {
  const { handleSubmit, control, trigger, getValues, setValue, register } =
    useForm<FormValues>({
      defaultValues: {
        statuses: [],
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "statuses",
  });

  useEffect(() => {
    console.log("Render");
  }, [fields]);

  return (
    <Grid direction="column">
      <Typography>Status Updates</Typography>
      <Grid item>
        {fields.map((field, index) => {
          return (
            <Status
              key={index}
              name={"statuses"}
              control={control}
              index={index}
              setValue={setValue}
              getValues={getValues}
              remove={remove}
              field={field}
              register={register}
            />
          );
        })}
      </Grid>
      <Grid item container xs={12} justifyContent={"right"}>
        <IconButton
          data-cy={"placeholder"}
          onClick={() => {
            append(EMPTY_STATUS_ROW);
          }}
        >
          <AddCircle fontSize="large" color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
