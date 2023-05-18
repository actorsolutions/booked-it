import {
  DatePicker,
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
import { createAudition } from "@/apihelpers/auditions";

export const AuditionForm = () => {
  const { getValues, control } = useForm<AuditionFormData>({
    defaultValues: {
      date: undefined,
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
    const createdAudition = await createAudition(getValues());
    console.log(createdAudition);
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h5">
        Add Audition
      </Typography>
      <Divider />
      <Form>
        <Grid item xs={12} md={6}>
          <DatePicker control={control} />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleCreate}
          >
            Submit
          </Button>
        </Grid>
      </Form>
    </Container>
  );
};
