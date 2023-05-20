import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
interface Props<T extends FieldValues> {
  cyTag: string;
  inputId: string;
  inputType?: string;
  control: Control<T>;
  field: Path<T>;
  rules?: RegisterOptions;
}

export const FormTextArea = <T extends FieldValues>(props: Props<T>) => {
  const { cyTag, inputId, control, field } = props;
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
                data-cy={cyTag}
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
