import { FormGroupRow, FormLabel, FormDropdown } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const TypeDropdown = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  const typeItems = [
    { value: "television", label: "Television" },
    { value: "film", label: "Film" },
    { value: "student", label: "Student" },
    { value: "theater", label: "Theater" },
    { value: "industrial", label: "Industrial" },
    { value: "commercial", label: "Commercial" },
    { value: "newMedia", label: "New Media" },
  ];
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
        <FormDropdown
          inputCypressTag="audition-type-dropdown"
          inputId="audition-type-dropdown"
          control={control}
          field="type"
          labelId="typesDropdown"
          menuItems={typeItems}
        />
      </Container>
    </FormGroupRow>
  );
};
