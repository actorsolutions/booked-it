import { FieldValues } from "react-hook-form";
export { ConnectForm } from "./Connect.form";
export { UserNameInput } from "./UserNameInput";
export { PasswordInput } from "./PasswordInput";
export interface FormValues extends FieldValues {
  userName: string;
  lastName: string;
}
