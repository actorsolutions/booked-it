import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import {Control, FieldValues, UseFormRegister} from "react-hook-form";

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
          cyTag="audition-casting-fName-label"
          labelText="Casting First Name"
          htmlFor="castingFirstName"
        />
      </Container>
      <Container>
        <FormInput
          cyTag="casting-first-name"
          inputId="casting-first-name"
          control={control}
          field="fName"
          {...register("fName", { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
