import { Control, RegisterOptions, FieldValues, Path } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface Props<T extends FieldValues> {
  cyTag: string;
  inputId: string;
  control: Control<T>;
  field: Path<T>;
  rules?: RegisterOptions;
  // eslint-disable-next-line no-unused-vars
  setDate: (V: Date) => void;
  defaultValue?: number;
}

export const FormDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const { cyTag, setDate, defaultValue } = props;
  let date;
  if (defaultValue) {
    date = new Date(defaultValue * 1000);
  } else {
    date = new Date();
  }
  const [pickerDate, setPickerDate] = useState(date);
  useEffect(() => {
    setDate(pickerDate);
  }, [pickerDate]);

  return (
    <div>
      <FormControl fullWidth={true}>
        <div data-cy={cyTag}>
          <DatePicker
            value={dayjs(pickerDate)}
            onChange={(event: any) => {
              if (!event || event.$d === "Invalid Date") {
                // Invalid Date entry auto goes back to today
                setPickerDate(new Date(new Date().setHours(0, 0, 0, 0)));
              } else {
                const epochDate = new Date(event.$d);
                setPickerDate(epochDate);
              }
            }}
          />
        </div>
      </FormControl>
    </div>
  );
};
