import { FormGroupRow, FormDatePicker } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface DatePickerProps extends FormProps<AuditionFormData> {
  setValue: UseFormSetValue<AuditionFormData>;
  getValues: UseFormGetValues<AuditionFormData>;
}
export const AuditionDatePicker = (props: DatePickerProps) => {
  const { setValue, getValues } = props;
  const { control } = props;
  const setDate = (value: Date) => {
    const formattedDate = value.getTime() / 1000;
    setValue("date", formattedDate);
  };
  return (
    <FormGroupRow>
      <Container>
        <FormDatePicker
          cyTag={CY_TAGS.AUDITION_FORM.PICKERS.DATE}
          inputId="auditionDateInput"
          setDate={setDate}
          control={control}
          field="date"
          defaultValue={getValues().date}
        />
      </Container>
    </FormGroupRow>
  );
};
