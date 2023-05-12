import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const ProjectInput = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          labelCypressTag="audition-project-label"
          labelText="Audition Project"
          htmlFor="projectInput"
        />
      </Container>
      <Container>
        <FormInput
          inputCypressTag="audition-project-input"
          inputId="auditionProjectInput"
          control={control}
          field="project"
        />
      </Container>
    </FormGroupRow>
  );
};
