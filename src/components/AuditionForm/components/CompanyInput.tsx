import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
export const CompanyInput = (props: FormProps<AuditionFormData>) => {
  const { control, register } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={CY_TAGS.AUDITION_FORM.INPUTS.LABELS.COMPANY}
          labelText="Audition Company"
          htmlFor="companyInput"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.AUDITION_FORM.INPUTS.COMPANY}
          inputId="auditionCompanyInput"
          control={control}
          field="company"
          {...register("company", { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
