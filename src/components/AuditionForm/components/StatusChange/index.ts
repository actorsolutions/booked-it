import { FormattedStatus } from "@/types/statuschange";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";

export const EMPTY_STATUS_ROW = {
  type: "submitted",
  date: 0,
  statusId: 0,
};

export interface FormValues {
  statuses: FormattedStatus[];
}
export interface FormProps<T extends FieldValues> {
  control: any;
  register: any;
}
