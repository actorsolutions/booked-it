import { FormGroupRow, FormLabel, FormInput } from "../../../common/Form";
import { FormValues } from "./index";
import { Container } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";

export interface Props<T extends FieldValues> {
  control: Control<T>;
}
export const RoleInput = (props: Props<FormValues>) => {
  const { control } = props;

  return (
    <FormGroupRow>
      <Container>
        <FormLabel cyTag="rep-role-label" labelText="Role" htmlFor="repRole" />
      </Container>
      <Container>
        <FormInput
          cyTag="rep-input-role"
          inputId="rep-role"
          control={control}
          field="role"
        />
      </Container>
    </FormGroupRow>
  );
};
