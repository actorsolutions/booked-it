import { FormattedStatus } from "@/types/statuschange";
import { Control, FieldValues, UseFormSetValue } from "react-hook-form";

const today = new Date().setHours(0, 0, 0, 0);
export const EMPTY_STATUS_ROW = {
  type: "scheduled",
  date: today,
  statusId: 0,
};

export interface FormValues {
  statuses: FormattedStatus[];
}
// eslint-disable-next-line no-unused-vars
export interface FormProps<T extends FieldValues> {
  control: Control<FormattedStatus, any>;
  index: number;
  updateStatuses: () => void;
  // eslint-disable-next-line no-unused-vars
  setDate?: (V: Date) => void;
  setValue: UseFormSetValue<FormValues>;
}
