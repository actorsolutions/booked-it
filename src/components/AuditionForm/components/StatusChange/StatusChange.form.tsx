import React from "react";
import {
  EMPTY_STATUS_ROW,
  FormValues,
} from "@/components/AuditionForm/components/StatusChange/index";
import { Grid, IconButton, Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { StatusRow } from "./StatusRow";
import AddCircle from "@mui/icons-material/AddCircle";
import { FormattedStatus } from "@/types/statuschange";
import CY_TAGS from "@/support/cypress_tags";

interface Props {
  // eslint-disable-next-line no-unused-vars
  setStatuses: (updatedStatuses: FormattedStatus[]) => void;
  statuses: FormattedStatus[];
}
export const StatusChangeForm = (props: Props) => {
  const { AUDITION_FORM } = CY_TAGS;
  const { setStatuses, statuses } = props;
  const { control, getValues, setValue } = useForm<FormValues>({
    defaultValues: {
      statuses: statuses,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "statuses",
  });

  const updateStatuses = () => {
    setStatuses(getValues().statuses);
  };
  return (
    <Grid direction="column" data-cy={AUDITION_FORM.CONTAINERS.STATUS_CHANGE}>
      <Typography>Status Timeline</Typography>
      <Grid item>
        {fields.map((field, index) => {
          return (
            <StatusRow
              key={index}
              name={"statuses"}
              control={control}
              index={index}
              setValue={setValue}
              getValues={getValues}
              remove={remove}
              field={field}
              updateStatuses={updateStatuses}
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
          <AddCircle fontSize="small" color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
