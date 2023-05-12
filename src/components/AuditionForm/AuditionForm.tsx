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
      <DateInput control={control} />
      <NotesInput control={control} />
      <ProjectInput control={control} />
      <StatusDropdown control={control} />
      <TypeDropdown control={control} />
      <CompanyInput control={control} />
    </Form>
  );
};
