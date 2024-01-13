import React, { useEffect, useState } from "react";
import { ProfileFormData } from "@/components/ProfileForm/index";
import { useUser } from "@auth0/nextjs-auth0/client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/common/Form";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider, Typography } from "@mui/material";
import CY_TAGS from "@/support/cypress_tags";
import { FirstNameInput } from "@/components/ProfileForm/components/FirstNameInput";
import { LastNameInput } from "@/components/ProfileForm/components/LastNameInput";
import { AAUserNameInput } from "@/components/ProfileForm/components/AAUserNameInput";
import { AAPasswordInput } from "@/components/ProfileForm/components/AAPasswordInput";
import { updateProfile } from "@/apihelpers/profile";
import { decryptEntry, encryptEntry } from "@/models/utils/UserUtils";
import { Profile } from "@/types/profile";
import DoneIcon from "@mui/icons-material/Done";
import { checkAA } from "@/apihelpers/actorsAccess";
interface ProfileFormProps {
  handleClose: () => void;
}
export const ProfileForm = (props: ProfileFormProps) => {
  const [aaCheck, setAACheck] = useState(false);
  const { handleClose } = props;
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
  const checkUNandPW = async () => {
    const userName = getValues("AA_UN");
    const password = getValues("AA_PW");
    if (userName && password) {
      const response = await checkAA(userName, password);
      if (response) {
        setAACheck(true);
      } else {
        setAACheck(false);
      }
    } else {
      setAACheck(false);
    }
    return true;
  };

  const handleClick = async () => {
    const updateData = getValues();
    if (user) {
      await updateProfile({
        ...updateData,
        sid: profile?.sid as string,
        id: profile?.id as number,
      }).then(() => {
        user.firstName = updateData.firstName;
        user.lastName = updateData.lastName;
        user.AA_UN = encryptEntry(updateData.AA_UN as string);
        user.AA_PW = encryptEntry(updateData.AA_PW as string);
        handleClose();
      });
    }
  };

  useEffect(() => {
    checkUNandPW();
  }, []);
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
            <Divider />
            <AAUserNameInput
              control={control}
              register={register}
              customOnBlur={checkUNandPW}
            />
            <AAPasswordInput
              control={control}
              register={register}
              customOnBlur={checkUNandPW}
            />

            {aaCheck && (
              <Container data-cy={PROFILE_FORM.AA_CHECK}>
                <Typography variant="caption">
                  Username and Password verified!
                </Typography>
                <DoneIcon color="primary" />
              </Container>
            )}
            <Divider />
            <Button
              data-cy={PROFILE_FORM.BUTTON.SAVE_BUTTON}
              onClick={handleClick}
              variant={"contained"}
            >
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
