import { Control, FieldValues } from "react-hook-form";
import { ProfileFormData } from "@/components/ProfileForm";
import { Representation } from "@/types/profile";
export { RepForm } from "@/components/ProfileForm/components/RepForm/RepForm";
export interface FormValues extends FieldValues {
  fName: string;
  lName: string;
  role: string;
  company: string;
}

export interface FormProps<T extends ProfileFormData> {
  handleClose: () => void;
  initialRepList: any;
  profileControl: Control<T>;
  // eslint-disable-next-line no-unused-vars
  setReps: (repArray: Representation[]) => void;
}
