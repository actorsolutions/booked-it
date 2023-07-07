import { FormGroupRow, FormDatePicker } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { useForm } from "react-hook-form";
export const AuditionDatePicker = (props: FormProps<AuditionFormData>) => {
  const { setValue, getValues } = useForm();
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
