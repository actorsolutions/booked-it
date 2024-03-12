import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import CY_TAGS from "@/support/cypress_tags";

export interface Props<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
}
export const LastNameInput = (props: Props<FormValues>) => {
  const { control, register } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={CY_TAGS.REP_FORM.INPUTS.LABELS.LAST_NAME}
          labelText="Last Name"
          htmlFor="repLastName"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.REP_FORM.INPUTS.LAST_NAME}
          inputId="rep-last-name"
          control={control}
          field="lName"
          {...register("lName", { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
