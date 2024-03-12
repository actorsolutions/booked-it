import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import CY_TAGS from "@/support/cypress_tags";

export interface Props<T extends FieldValues> {
  control: Control<T>;
}
export const RoleInput = (props: Props<FormValues>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel
          cyTag={CY_TAGS.REP_FORM.INPUTS.LABELS.ROLE}
          labelText="Role"
          htmlFor="repRole"
        />
      </Container>
      <Container>
        <FormInput
          cyTag={CY_TAGS.REP_FORM.INPUTS.ROLE}
          inputId="rep-role"
          control={control}
          field="role"
        />
      </Container>
    </FormGroupRow>
  );
};
