import { FormGroupRow, FormLabel, FormDropdown } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const StatusDropdown = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  const statusItems = [
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
          cyTag="audition-status-label"
          labelText="Audition Status"
          htmlFor="statusDropdown"
        />
      </Container>
      <Container>
        <FormDropdown
          cyTag="audition-status-dropdown"
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
