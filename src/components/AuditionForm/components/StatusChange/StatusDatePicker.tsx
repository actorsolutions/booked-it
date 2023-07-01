import { FormGroupRow, FormDatePicker } from "../../../common/Form";
import { FormProps } from "./index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { FormattedStatus } from "@/types/statuschange";
export const StatusDatePicker = (props: FormProps<FormattedStatus>) => {
  const { control, register } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormDatePicker
          cyTag={CY_TAGS.AUDITION_FORM.PICKERS.DATE}
          inputId="auditionDateInput"
          control={control}
          field="date"
          {...register("date", { required: true })}
        />
      </Container>
    </FormGroupRow>
  );
};
