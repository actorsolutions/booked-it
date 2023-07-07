import { FormGroupRow, FormDropdown } from "../../../common/Form";
import { FormProps } from "./index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { FormattedStatus } from "@/types/statuschange";
import { useEffect } from "react";

export const StatusDropdown = (props: FormProps<FormattedStatus>) => {
  const { control, index, updateStatuses, register } = props;

  const statusItems = [
    { value: 0, label: "Submitted" },
    { value: 1, label: "Scheduled" },
    { value: 2, label: "Auditioned" },
    { value: 3, label: "Callback" },
    { value: 4, label: "Booked" },
  ];
  useEffect(() => {
    updateStatuses();
  }, [updateStatuses]);
  return (
    <FormGroupRow>
      <Container>
        <FormDropdown
          cyTag={CY_TAGS.AUDITION_FORM.DROPDOWNS.STATUS + `${index}`}
          inputId="statusChange-drop-down"
          control={control}
          field={`statuses.${index}.statusId`}
          labelId="statusDropdown"
          menuItems={statusItems}
          dropDownCyTag={
            CY_TAGS.AUDITION_FORM.FORMS.STATUS_CHANGE.STATUS_DROPDOWN
          }
          defaultValue={0}
          {...register(`statuses.${index}.statusId`, { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
