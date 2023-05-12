import { FormGroupRow, FormLabel, FormDropdown } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const TypeDropdown = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  const typeItems = [
    { value: "submitted", label: "Submitted" },
    { value: "scheduled", label: "Scheduled" },
    { value: "auditioned", label: "Auditioned" },
    { value: "callback", label: "Callback" },
    { value: "booked", label: "Booked" },
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
          field="types"
          labelId="typesDropdown"
          menuItems={typeItems}
        />
      </Container>
    </FormGroupRow>
  );
};
