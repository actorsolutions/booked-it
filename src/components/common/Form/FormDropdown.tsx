import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";
import { AuditionFormData } from "../../AuditionForm/index";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface Item {
  value: string | number;
  label: string;
}
interface Props<T extends FieldValues> {
  cyTag: string;
  inputId: string;
  inputType?: string;
  control: Control<T>;
  field: string;
  rules?: RegisterOptions;
  labelId: string;
  menuItems: Item[];
}

export const FormDropdown = (props: Props<AuditionFormData>) => {
  const { cyTag, inputId, control, field, inputType, labelId, menuItems } =
    props;
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange } }) => {
          return (
            <FormControl>
              <Select
                id={inputId}
                data-cy={cyTag}
                type={inputType}
                labelId={labelId}
                onChange={(event: any) => {
                  onChange(event.target.value);
                }}
                sx={{
                  width: 195,
                  height: 50,
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />
    </div>
  );
};
