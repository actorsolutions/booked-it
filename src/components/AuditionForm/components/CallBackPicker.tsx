import { FormGroupRow, FormLabel, FormDatePicker } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";

export const CallbackPicker = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag="audition-callback-label"
          labelText="Callback Date"
          htmlFor="auditionCallbackDate"
        />
      </Container>
      <Container>
        <FormDatePicker
          cyTag="audition-callback-picker"
          inputId="auditionCallbackDate"
          control={control}
          field="callback"
        />
      </Container>
    </FormGroupRow>
  );
};
