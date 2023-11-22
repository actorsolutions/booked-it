import { FormGroupRow, FormLabel, FormInput } from "../../common/Form";
import { FormProps, ProfileFormData } from "../index";
import { Container } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
export const AAUserNameInput = (props: FormProps<ProfileFormData>) => {
  const { control, register } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.LABELS.AA_UN}
          labelText="Actors Access Username"
          htmlFor="AA_UN"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.PROFILE_FORM.INPUT.AA_UN}
          inputId="AA_UN"
          control={control}
          field="AA_UN"
          {...register("AA_UN")}
        />
      </Container>
    </FormGroupRow>
  );
};
