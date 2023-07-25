import { FieldValues, Control, UseFormRegister } from "react-hook-form";
import { Casting } from "@/types";
import { FormattedStatus } from "@/types/statuschange";
export { AuditionForm } from "./AuditionForm";
export interface AuditionFormData extends FieldValues {
  id?: number;
  date: number;
  project: string;
  company: string;
  callbackDate?: number;
  casting?: Casting[];
  notes: string;
  type: string;
  status: string;
  archived: boolean;
  statuses: FormattedStatus[] | [];
}

export interface FormProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
}

export const AUDITION_STATUSES = [
  "submitted",
  "scheduled",
  "callback",
  "booked",
];
