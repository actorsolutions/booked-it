import { FormGroupRow, FormLabel, FormDropdown } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";

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
          cyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.LABELS.TYPE}
          labelText="Audition Project"
          htmlFor="projectInput"
        />
      </Container>
      <Container>
        <FormDropdown
          cyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.TYPE}
          inputId="audition-type-dropdown"
          control={control}
          field="type"
          labelId="typesDropdown"
          menuItems={typeItems}
          dropDownCyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.OPTIONS.TYPE}
        />
      </Container>
    </FormGroupRow>
  );
};