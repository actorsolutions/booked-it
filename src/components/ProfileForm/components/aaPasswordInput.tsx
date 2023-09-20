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
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.LABELS.AA_PW}
          labelText="Password"
          htmlFor="AA_PW"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.LAST_NAME}
          inputId="AA_PW"
          control={control}
          field="AA_PW"
          {...register("AA_PW")}
        />
      </Container>
    </FormGroupRow>
  );
};
