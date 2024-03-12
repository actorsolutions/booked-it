import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import CY_TAGS from "@/support/cypress_tags";

export interface Props<T extends FieldValues> {
  control: Control<T>;
}
export const CompanyInput = (props: Props<FormValues>) => {
  const { control } = props;
  const { REP_FORM } = CY_TAGS;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={REP_FORM.INPUTS.LABELS.COMPANY}
          labelText="Company"
          htmlFor="repCompany"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={REP_FORM.INPUTS.COMPANY}
          inputId="rep-company"
          control={control}
          field="company"
        />
      </Container>
    </FormGroupRow>
  );
};
