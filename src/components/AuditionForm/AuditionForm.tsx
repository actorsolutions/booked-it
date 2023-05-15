import {
  DateInput,
  NotesInput,
  ProjectInput,
  StatusDropdown,
  TypeDropdown,
  CompanyInput,
} from "@/components/AuditionForm/components";
import { useForm } from "react-hook-form";
import { AuditionFormData } from "../AuditionForm";
import { Form } from "@/components/common/Form";
import { Container } from "@mui/system";
import {
  Stack,
  Box,
  IconButton,
  Modal,
  Typography,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";

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
    trigger,
    formState: { errors },
    clearErrors,
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

  return (
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
        <NotesInput control={control} />
      </Grid>
    </Form>
  );
};
