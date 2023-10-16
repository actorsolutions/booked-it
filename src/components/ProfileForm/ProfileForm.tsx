import React, { Dispatch, SetStateAction, useState } from "react";
import { ProfileFormData } from "@/components/ProfileForm/index";
import { CreateProfileData } from "@/types/profile";

import { useForm } from "react-hook-form";
import { Form } from "@/components/common/Form";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider } from "@mui/material";
interface Props {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  AA_UN?: string;
  AA_PW?: string;
}
export const ProfileForm = (props: Props) => {
  const { id, email, firstName, lastName, AA_UN, AA_PW } = props;

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
};
