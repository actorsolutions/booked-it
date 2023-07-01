import {
  Control,
  Path,
  FieldValues,
  FieldArrayWithId,
  UseFormSetValue,
  UseFormGetValues,
  RegisterOptions,
} from "react-hook-form";
import { FormValues } from "@/components/AuditionForm/components/StatusChange/index";
import React from "react";
import { StatusDatePicker } from "@/components/AuditionForm/components/StatusChange/StatusDatePicker";
import Grid from "@mui/material/Grid";
import { StatusDropdown } from "@/components/AuditionForm/components/StatusChange/StatusDropdown";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  index: number;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  remove: (index: number) => void;
  field: FieldArrayWithId<FormValues, "statuses", "id">;
  register: RegisterOptions<T>;
  key: number;
}
export const Status = (props: Props<FormValues>) => {
  const { control, field, remove, onBlur, index, getValues, register } = props;

  const statusRow = () => getValues().statuses[index] || field;

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <StatusDropdown control={control} register={register} />
        </Grid>
        <Grid item>
          <StatusDatePicker control={control} register={register} />
        </Grid>
      </Grid>
    </>
  );
};
