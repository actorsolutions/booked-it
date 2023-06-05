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
import { TextField } from "@mui/material";
import dayjs from "dayjs";
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
        render={({ field: { onChange, ref, ...field } }) => {
          return (
            <FormControl>
              <div data-cy={cyTag}>
                <DatePicker
                  inputRef={ref}
                  label={"Audition Date"}
                  value={dayjs(field.value)}
                  onChange={(event: any) => {
                    const epochDate = new Date(event.$d).getTime() / 1000;
                    onChange(epochDate);
                  }}
                />
              </div>
            </FormControl>
          );
        }}
      />
    </div>
  );
};
