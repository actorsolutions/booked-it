import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";
import { AuditionFormData } from "../../AuditionForm/index";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

interface MenuItem {
  value: string | number;
  label: string;
}
interface Props<T extends FieldValues> {
  inputCypressTag: string;
  inputId: string;
  inputType?: string;
  control: Control<T>;
  field: string;
  rules?: RegisterOptions;
  labelId: string;
  menuItems: MenuItem[];
}

export const FormDropdown = (props: Props<AuditionFormData>) => {
  const {
    inputCypressTag,
    inputId,
    control,
    field,
    inputType,
    labelId,
    menuItems,
  } = props;
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange } }) => {
          return (
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                id={inputId}
                data-cy={inputCypressTag}
                onChange={onChange}
                type={inputType}
                labelId={labelId}
                autoWidth={true}
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
