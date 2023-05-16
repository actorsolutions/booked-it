import {
  FormGroupRow,
  FormLabel,
  FormInput,
  FormTextArea,
} from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const NotesTextArea = (props: FormProps<AuditionFormData>) => {
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
        <FormTextArea
          inputCypressTag="audition-company-notes"
          inputId="auditionsNotesInput"
          control={control}
          field="notes"
        />
      </Container>
    </FormGroupRow>
  );
};
