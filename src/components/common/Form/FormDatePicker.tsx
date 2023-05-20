import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
interface Props<T extends FieldValues> {
  cyTag: string;
  inputId: string;
  control: Control<T>;
  field: Path<T>;
  rules?: RegisterOptions;
}

export const FormDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const { cyTag, control, field } = props;
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange } }) => {
          // @ts-ignore
          return (
            <FormControl>
              <DatePicker
                label={"Audition Date"}
                data-cy={cyTag}
                onChange={(event: any) => {
                  const epochDate = new Date(event.$d).getTime() / 1000;
                  onChange(epochDate);
                }}
              />
            </FormControl>
          );
        }}
      />
    </div>
  );
};
