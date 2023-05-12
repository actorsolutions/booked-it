import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const DateInput = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          labelCypressTag="audition-date-label"
          labelText="Audition Date"
          htmlFor="dateInput"
        />
      </Container>
      <Container>
        <FormInput
          inputCypressTag="audition-date-input"
          inputId="auditionDateInput"
          control={control}
          field="date"
        />
      </Container>
    </FormGroupRow>
  );
};
