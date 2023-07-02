import { FormGroupRow, FormLabel, FormDropdown } from "../../../common/Form";
import { FormProps } from "./index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { FormattedStatus } from "@/types/statuschange";

export const StatusDropdown = (props: FormProps<FormattedStatus>) => {
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
        <FormDropdown
          cyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.STATUS}
          inputId="statusChange-drop-down"
          control={control}
          field="status"
          labelId="statusDropdown"
          menuItems={statusItems}
          dropDownCyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS}
          {...register("status", { required: true })}
          defaultValue={"submitted"}
        />
      </Container>
    </FormGroupRow>
  );
};
