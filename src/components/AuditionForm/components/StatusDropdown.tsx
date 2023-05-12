import { FormGroupRow, FormLabel, FormDropdown } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const StatusDropdown = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  const statusItems = [
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
          labelCypressTag="audition-status-label"
          labelText="Audition Status"
          htmlFor="statusDropdown"
        />
      </Container>
      <Container>
        <FormDropdown
          inputCypressTag="audition-status-dropdown"
          inputId="audition-status-down"
          control={control}
          field="status"
          labelId="statusDropdown"
          menuItems={statusItems}
        />
      </Container>
    </FormGroupRow>
  );
};
