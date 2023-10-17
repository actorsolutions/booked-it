import React from "react";
import { ProfileFormData } from "@/components/ProfileForm/index";
import { useUser } from "@auth0/nextjs-auth0/client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/common/Form";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { FirstNameInput } from "@/components/ProfileForm/components/FirstNameInput";
import { LastNameInput } from "@/components/ProfileForm/components/LastNameInput";
import { AAUserNameInput } from "@/components/ProfileForm/components/AAUserNameInput";
import { AAPasswordInput } from "@/components/ProfileForm/components/AAPasswordInput";
import { updateProfile } from "@/apihelpers/profile";

interface Props {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  AA_UN?: string;
  AA_PW?: string;
}
export const ProfileForm = (props: Props) => {
  const { user } = useUser();
  const { email, firstName, lastName, AA_UN, AA_PW } = props;
  const { PROFILE_FORM } = CY_TAGS;
  const {
    getValues,
    control,
    watch,
    setValue,
    register,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm<ProfileFormData>({
    defaultValues: {
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      AA_UN: AA_UN || "",
      AA_PW: AA_PW || "",
    },
  });
  const handleClick = async () => {
    const updateData = getValues();
    if (user) {
      await updateProfile({
        ...updateData,
        sid: user.sid as string,
        id: user.id as number,
      });
    }
  };
  return (
    <Container
      data-cy={PROFILE_FORM.CONTAINERS.FORM_CONTAINER}
      maxWidth="md"
      id="pofileModal"
    >
      <Divider />
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FirstNameInput control={control} register={register} />
            <LastNameInput control={control} register={register} />
            <AAUserNameInput control={control} register={register} />
            <AAPasswordInput control={control} register={register} />
            <Divider />
            <Button onClick={handleClick} variant={"contained"}>
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
