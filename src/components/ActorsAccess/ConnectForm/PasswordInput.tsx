import { FormInput } from "../../common/Form";
import { FormValues } from "./index";
import { Grid } from "@mui/material";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import CY_TAGS from "@/support/cypress_tags";

export interface Props<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
}
export const PasswordInput = (props: Props<FormValues>) => {
  const { control, register } = props;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      wrap="nowrap"
    >
      <Grid item>
        <FormInput
          cyTag={CY_TAGS.ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.PASSWORD_INPUT}
          inputId="actors-access-password"
          control={control}
          field="password"
          label="Password"
          inputType="password"
          {...register("password", { required: true })}
        />
      </Grid>
    </Grid>
  );
};
