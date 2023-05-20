import { FormGroupRow, FormLabel, FormTextArea } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const NotesTextArea = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag="audition-notes-label"
          labelText="Audition Notes"
          htmlFor="notesInput"
        />
      </Container>
      <Container>
        <FormTextArea
          cyTag="audition-company-notes"
          inputId="auditionsNotesInput"
          control={control}
          field="notes"
        />
      </Container>
    </FormGroupRow>
  );
};
