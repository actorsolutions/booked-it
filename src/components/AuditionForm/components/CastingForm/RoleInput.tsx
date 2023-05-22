import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";

export interface Props<T extends FieldValues> {
  control: Control<T>;
}
export const RoleInput = (props: Props<FormValues>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag="audition-casting-role-label"
          labelText="Person's Role"
          htmlFor="castingRole"
        />
      </Container>
      <Container>
        <FormInput
          cyTag="casting-role"
          inputId="casting-role"
          control={control}
          field="role"
        />
      </Container>
    </FormGroupRow>
  );
};
