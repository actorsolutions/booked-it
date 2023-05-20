import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";

export interface Props<T extends FieldValues> {
  control: Control<T>;
}
export const CompanyInput = (props: Props<FormValues>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag="audition-casting-company-label"
          labelText="Casting Company"
          htmlFor="castingCompany"
        />
      </Container>
      <Container>
        <FormInput
          cyTag="casting-company"
          inputId="casting-company"
          control={control}
          field="company"
        />
      </Container>
    </FormGroupRow>
  );
};
