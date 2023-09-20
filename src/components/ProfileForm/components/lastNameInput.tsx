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
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.LABELS.LAST_NAME}
          labelText="Last Name"
          htmlFor="lastName"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.LAST_NAME}
          inputId="lastName"
          control={control}
          field="lastName"
          {...register("lastName")}
        />
      </Container>
    </FormGroupRow>
  );
};
