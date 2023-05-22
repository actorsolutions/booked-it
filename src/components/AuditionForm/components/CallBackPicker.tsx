import { FormGroupRow, FormDatePicker } from "../../common/Form";
import { FormProps, AuditionFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
export const CallbackPicker = (props: FormProps<AuditionFormData>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormDatePicker
          cyTag={CY_TAGS.AUDITION_FORM.PICKERS.CALLBACK}
          inputId="auditionCallbackDate"
          control={control}
          field="callback"
        />
      </Container>
    </FormGroupRow>
  );
};
