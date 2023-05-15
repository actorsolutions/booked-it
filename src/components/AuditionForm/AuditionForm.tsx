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
  Grid,
  Paper,
} from "@mui/material";

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
    <Paper>
      <Form>
        <DateInput control={control} />
        <NotesInput control={control} />
        <ProjectInput control={control} />
        <StatusDropdown control={control} />
        <TypeDropdown control={control} />
        <CompanyInput control={control} />
      </Form>
    </Paper>
  );
};
