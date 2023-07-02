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
  dropDownCyTag: string;
  defaultValue?: string;
}

export const FormDropdown = <T extends FieldValues>(props: Props<T>) => {
  const {
    cyTag,
    inputId,
    control,
    field,
    inputType,
    labelId,
    menuItems,
    dropDownCyTag,
    defaultValue,
  } = props;
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange, ref, ...field } }) => {
          return (
            <FormControl fullWidth={true}>
              <Select
                {...field}
                defaultValue={defaultValue}
                displayEmpty
                inputRef={ref}
                id={inputId}
                data-cy={cyTag}
                type={inputType}
                labelId={labelId}
                onChange={(event: any) => {
                  onChange(event.target.value);
                }}
                sx={{
                  height: 50,
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    data-cy={dropDownCyTag}
                    key={item.label}
                    value={item.value}
                  >
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
