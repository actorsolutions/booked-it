import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [value, setValue] = useState<number | null>(null);
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange, ref, ...field } }) => {
          setValue(field.value);
          return (
            <FormControl fullWidth={true}>
              <div data-cy={cyTag}>
                <DatePicker
                  inputRef={ref}
                  defaultValue={dayjs(new Date())}
                  value={value ? dayjs(value) : undefined}
                  onChange={(event: any) => {
                    if (event.$d != null) {
                      const epochDate = new Date(event.$d).getTime();
                      setValue(epochDate);
                      onChange(epochDate);
                    }
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
