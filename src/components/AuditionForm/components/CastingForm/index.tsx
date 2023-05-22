import { Control, FieldValues } from "react-hook-form";
export { CastingForm } from "./CastingForm";
import { AuditionFormData } from "@/components/AuditionForm";
import { Casting } from "@/types/auditions";
export interface FormValues extends FieldValues {
  fName: string;
  lName: string;
  role?: string;
  company?: string;
}

export interface FormProps<T extends AuditionFormData> {
  auditionControl: Control<T>;
  initialCastingList: any;
  // eslint-disable-next-line no-unused-vars
  setCasting(array: Casting[]): void;
  handleClose: () => void;
}
