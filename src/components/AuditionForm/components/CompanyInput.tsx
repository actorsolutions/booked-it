import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const CompanyInput = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          labelCypressTag="audition-company-label"
          labelText="Audition Company"
          htmlFor="companyInput"
        />
      </Container>
      <Container>
        <FormInput
          inputCypressTag="audition-company-input"
          inputId="auditionCompanyInput"
          control={control}
          field="company"
        />
      </Container>
    </FormGroupRow>
  );
};
