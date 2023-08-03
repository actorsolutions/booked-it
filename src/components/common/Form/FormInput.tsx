import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
interface Props<T extends FieldValues> {
  cyTag: string;
  inputId: string;
  inputType?: string;
  control: Control<T>;
  field: Path<T>;
  rules?: RegisterOptions;
  label?: string;
}

export const FormInput = <T extends FieldValues>(props: Props<T>) => {
  const { label, cyTag, inputId, control, field, inputType } = props;
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange, ...field } }) => {
          return (
            <FormControl fullWidth={true}>
              <TextField
                {...field}
                id={inputId}
                data-cy={cyTag}
                onChange={onChange}
                type={inputType}
                label={label}
              />
            </FormControl>
          );
        }}
      />
    </div>
  );
};
