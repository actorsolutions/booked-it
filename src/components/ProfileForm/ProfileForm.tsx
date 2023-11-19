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
import { decryptEntry } from "@/models/utils/UserUtils";
import { Profile } from "@/types/profile";

export const ProfileForm = () => {
  const { user } = useUser();
  const profile: Profile | undefined = user;

  const { PROFILE_FORM } = CY_TAGS;
  const { getValues, control, register } = useForm<ProfileFormData>({
    defaultValues: {
      email: profile?.email || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      AA_UN: profile?.AA_UN ? (decryptEntry(profile.AA_UN) as string) : "",
      AA_PW: profile?.AA_PW ? (decryptEntry(profile.AA_PW) as string) : "",
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
