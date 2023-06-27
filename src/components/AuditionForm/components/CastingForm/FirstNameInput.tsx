import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import {Control, FieldValues, UseFormRegister} from "react-hook-form";
import CY_TAGS from "@/support/cypress_tags";

export interface Props<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
}
export const FirstNameInput = (props: Props<FormValues>) => {
  const { control, register } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={CY_TAGS.CASTING_FORM.INPUTS.LABELS.FIRST_NAME}
          labelText="First Name"
          htmlFor="castingFirstName"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.CASTING_FORM.INPUTS.FIRST_NAME}
          inputId="casting-first-name"
          control={control}
          field="fName"
          {...register("fName", { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
