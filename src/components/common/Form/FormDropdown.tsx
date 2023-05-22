import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface Item {
  value: string | number;
  label: string;
}
interface Props<T extends FieldValues> {
  menuItems: Item[];
  cyTag: string;
  inputId: string;
  inputType?: string;
  control: Control<T>;
  field: Path<T>;
  rules?: RegisterOptions;
  labelId: string;
  dropDownCyTag,
}

export const FormDropdown = <T extends FieldValues>(props: Props<T>) => {
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
                {menuItems.map((item: Item) => (
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
