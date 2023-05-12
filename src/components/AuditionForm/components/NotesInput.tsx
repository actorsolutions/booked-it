import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const NotesInput = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          labelCypressTag="audition-notes-label"
          labelText="Audition Notes"
          htmlFor="notesInput"
        />
      </Container>
      <Container>
        <FormInput
          inputCypressTag="audition-company-notes"
          inputId="auditionsNotesInput"
          control={control}
          field="notes"
        />
      </Container>
    </FormGroupRow>
  );
};
