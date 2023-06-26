import { FormGroupRow, FormLabel, FormTextArea } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
export const NotesTextArea = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container style={{paddingTop: "8px"}}>
        <FormLabel
          cyTag={CY_TAGS.AUDITION_FORM.TEXT_AREA.LABELS.NOTES}
          labelText="Notes"
          htmlFor="notesInput"
        />
      </Container>
      <Container>
        <FormTextArea
          cyTag={CY_TAGS.AUDITION_FORM.TEXT_AREA.NOTES}
          inputId="auditionsNotesInput"
          control={control}
          field="notes"
        />
      </Container>
    </FormGroupRow>
  );
};
