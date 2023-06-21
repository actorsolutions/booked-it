import { FormGroupRow, FormLabel, FormDropdown } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";

export const StatusDropdown = (props: FormProps<AuditionFormData>) => {
  const { control, register } = props;

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
          cyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.LABELS.STATUS}
          labelText="Current Status"
          htmlFor="statusDropdown"
        />
      </Container>
      <Container>
        <FormDropdown
          cyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.STATUS}
          inputId="audition-status-down"
          control={control}
          field="status"
          labelId="statusDropdown"
          menuItems={statusItems}
          dropDownCyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS}
          {...register("status", { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
