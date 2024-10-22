import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, ProfileFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
export const AAPasswordInput = (props: FormProps<ProfileFormData>) => {
  const { control, register, customOnBlur } = props;

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
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.AA_PW}
          inputId="AA_PW"
          control={control}
          field="AA_PW"
          inputType={"password"}
          {...register("AA_PW", { onBlur: customOnBlur })}
        />
      </Container>
    </FormGroupRow>
  );
};
