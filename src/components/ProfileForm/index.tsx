import {
  ChangeHandler,
  Control,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Representation } from "@/types/users";

export interface ProfileFormData extends FieldValues {
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  AA_UN?: string;
  AA_PW?: string;
  CN_UN?: string;
  CN_PW?: string;
  representation?: Representation[];
}

export interface FormProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  customOnBlur?: ChangeHandler;
}
