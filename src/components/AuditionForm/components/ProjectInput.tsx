import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
export const ProjectInput = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={CY_TAGS.AUDITION_FORM.INPUTS.LABELS.PROJECT}
          labelText="Audition Project"
          htmlFor="projectInput"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.AUDITION_FORM.INPUTS.PROJECT}
          inputId="auditionProjectInput"
          control={control}
          field="project"
        />
      </Container>
    </FormGroupRow>
  );
};
