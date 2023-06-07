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
}

export const FormInput = <T extends FieldValues>(props: Props<T>) => {
  const { cyTag, inputId, control, field, inputType } = props;
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange, ref, ...field } }) => {
          return (
            <FormControl>
              <TextField
                {...field}
                inputRef={ref}
                id={inputId}
                data-cy={cyTag}
                onChange={onChange}
                type={inputType}
              />
            </FormControl>
          );
        }}
      />
    </div>
  );
};
