import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import {Control, FieldValues, UseFormRegister} from "react-hook-form";

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
          cyTag="audition-casting-lName-label"
          labelText="Casting Last Name"
          htmlFor="castingLastName"
        />
      </Container>
      <Container>
        <FormInput
          cyTag="casting-last-name"
          inputId="casting-last-name"
          control={control}
          field="lName"
          {...register("lName", { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
