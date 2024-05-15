import { FormInput } from "../../common/Form";
import { ConnectFormValues } from "./index";
import { Grid } from "@mui/material";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import CY_TAGS from "@/support/cypress_tags";

export interface Props<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
}
export const UserNameInput = (props: Props<ConnectFormValues>) => {
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
          cyTag={CY_TAGS.ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.USERNAME_INPUT}
          inputId="actors-access-userName"
          control={control}
          field="userName"
          label="User Name"
          {...register("userName", { required: true })}
        />
      </Grid>
    </Grid>
  );
};
