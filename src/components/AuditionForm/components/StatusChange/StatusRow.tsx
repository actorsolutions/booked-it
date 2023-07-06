import React from "react";

import {
  Control,
  Path,
  FieldValues,
  FieldArrayWithId,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { FormValues } from "@/components/AuditionForm/components/StatusChange/index";
import { StatusDatePicker } from "@/components/AuditionForm/components/StatusChange/StatusDatePicker";
import Grid from "@mui/material/Grid";
import { StatusDropdown } from "@/components/AuditionForm/components/StatusChange/StatusDropdown";
import { IconButton } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import CY_TAGS from "@/support/cypress_tags";
import { FormattedStatus } from "@/types/statuschange";
interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<FormattedStatus, any>;
  index: number;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  // eslint-disable-next-line no-unused-vars
  remove: (index: number) => void;
  field: FieldArrayWithId<FormValues, "statuses", "id">;
  key: number;
  updateStatuses: () => void;
}
export const StatusRow = (props: Props<FormValues>) => {
  const { control, remove, index, setValue, updateStatuses } = props;
  const { AUDITION_FORM } = CY_TAGS;
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        wrap="nowrap"
        data-cy={AUDITION_FORM.FORMS.STATUS_CHANGE.STATUS_ROW + `${index}`}
      >
        <Grid item>
          <StatusDropdown
            control={control}
            index={index}
            updateStatuses={updateStatuses}
            setValue={setValue}
          />
        </Grid>
        <Grid item>
          <StatusDatePicker
            control={control}
            index={index}
            updateStatuses={updateStatuses}
            setValue={setValue}
          />
        </Grid>
        <Grid item>
          <IconButton
            data-cy={"placeholder"}
            onClick={() => {
              remove(index);
            }}
          >
            <RemoveCircle fontSize="small" color="error" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};
