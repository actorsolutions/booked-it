import { FormGroupRow, FormDatePicker } from "../../../common/Form";
import { FormProps } from "./index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { FormattedStatus } from "@/types/statuschange";

export const StatusDatePicker = (props: FormProps<FormattedStatus>) => {
  const { register, control, index, updateStatuses, setValue, defaultValue } =
    props;
  const setDate = (value: Date) => {
    const formattedDate = Math.round(value.getTime() / 1000);
    setValue(`statuses.${index}.date`, formattedDate);
    updateStatuses();
  };
  return (
    <FormGroupRow>
      <Container>
        <FormDatePicker
          cyTag={
            CY_TAGS.AUDITION_FORM.FORMS.STATUS_CHANGE.DATE_PICKER + `${index}`
          }
          inputId={`statusDatePicker-${index}`}
          control={control}
          field={`statuses.${index}.date`}
          setDate={setDate}
          defaultValue={defaultValue}
          {...register(`statuses.${index}.date`, { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
