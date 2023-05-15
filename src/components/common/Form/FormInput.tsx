import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";
import { AuditionFormData } from "../../AuditionForm/index";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
interface Props<T extends FieldValues> {
  inputCypressTag: string;
  inputId: string;
  inputType?: string;
  control: Control<T>;
  field: string;
  rules?: RegisterOptions;
}

export const FormInput = (props: Props<AuditionFormData>) => {
  const { inputCypressTag, inputId, control, field, inputType } = props;
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange } }) => {
          return (
            <FormControl>
              <TextField
                id={inputId}
                data-cy={inputCypressTag}
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
