import { FieldValues } from "react-hook-form";
export { ConnectForm } from "./Connect.form";
export { UserNameInput } from "./UserNameInput";
export { PasswordInput } from "./PasswordInput";
export interface ConnectFormValues extends FieldValues {
  userName: string;
  password: string;
}
