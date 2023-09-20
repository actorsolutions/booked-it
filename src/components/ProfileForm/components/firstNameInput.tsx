import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, ProfileFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
export const CompanyInput = (props: FormProps<ProfileFormData>) => {
  const { control, register } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.LABELS.FIRST_NAME}
          labelText="First Name"
          htmlFor="firstName"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.FIRST_NAME}
          inputId="firstName"
          control={control}
          field="firstName"
          {...register("firstName")}
        />
      </Container>
    </FormGroupRow>
  );
};
