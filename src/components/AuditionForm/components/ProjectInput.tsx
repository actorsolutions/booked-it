import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
export const ProjectInput = (props: FormProps<AuditionFormData>) => {
  const { control, register } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={CY_TAGS.AUDITION_FORM.INPUTS.LABELS.PROJECT}
          labelText="Project Name"
          htmlFor="projectInput"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.AUDITION_FORM.INPUTS.PROJECT}
          inputId="auditionProjectInput"
          control={control}
          field="project"
          {...register("project", { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
