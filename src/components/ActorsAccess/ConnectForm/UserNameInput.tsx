import { FormLabel, FormInput, FormGroupRow } from "../../common/Form";
import { FormValues } from "./index";
import { Container, Grid } from "@mui/material";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import CY_TAGS from "@/support/cypress_tags";

export interface Props<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
}
export const UserNameInput = (props: Props<FormValues>) => {
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
          cyTag={CY_TAGS.CASTING_FORM.INPUTS.FIRST_NAME}
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
