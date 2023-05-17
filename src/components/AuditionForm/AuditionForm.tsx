import {
  DateInput,
  NotesTextArea,
  ProjectInput,
  StatusDropdown,
  TypeDropdown,
  CompanyInput,
} from "@/components/AuditionForm/components";
import { useForm } from "react-hook-form";
import { AuditionFormData } from "../AuditionForm";
import { Form } from "@/components/common/Form";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
};
export const AuditionForm = () => {
  const {
    register,
    unregister,
    getValues,
    formState: { errors },
    control,
  } = useForm<AuditionFormData>({
    defaultValues: {
      date: Date.now(),
      project: "",
      company: "",
      callbackDate: undefined,
      casting: undefined,
      notes: "",
      type: "",
      status: "",
      archived: false,
    },
  });

  const handleCreate = async () => {
    console.log(getValues());
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h5">
        Add Audition
      </Typography>
      <Divider />
      <Form>
        <Grid item xs={12} md={6}>
          <DateInput control={control} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectInput control={control} />
          <CompanyInput control={control} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatusDropdown control={control} />
          <TypeDropdown control={control} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NotesTextArea control={control} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Grid>
      </Form>
    </Container>
  );
};
