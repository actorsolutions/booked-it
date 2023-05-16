import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";
import { AuditionFormData } from "../../AuditionForm/index";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
interface Props<T extends FieldValues> {
  inputCypressTag: string;
  inputId: string;
  inputType?: string;
  control: Control<T>;
  field: string;
  rules?: RegisterOptions;
}

export const FormTextArea = (props: Props<AuditionFormData>) => {
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
              <TextareaAutosize
                id={inputId}
                data-cy={inputCypressTag}
                onChange={onChange}
                minRows={3}
              />
            </FormControl>
          );
        }}
      />
    </div>
  );
};
