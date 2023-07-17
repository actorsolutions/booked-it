import React from "react";

import {
  Control,
  Path,
  FieldValues,
  FieldArrayWithId,
  UseFormSetValue,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { FormValues } from "@/components/AuditionForm/components/StatusChange/index";
import { StatusDatePicker } from "@/components/AuditionForm/components/StatusChange/StatusDatePicker";
import Grid from "@mui/material/Grid";
import { StatusDropdown } from "@/components/AuditionForm/components/StatusChange/StatusDropdown";
import { IconButton } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import CY_TAGS from "@/support/cypress_tags";
import { FormattedStatus } from "@/types/statuschange";
import { deleteStatus } from "@/apihelpers/statuses";
import { useSnackBar } from "@/context/SnackbarContext";
import RESPONSE_MESSAGES from "@/support/response_messages";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<FormValues, any>;
  register: UseFormRegister<FormValues>;
  index: number;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  // eslint-disable-next-line no-unused-vars
  remove: (index: number) => void;
  field: FieldArrayWithId<FormValues, "statuses", "id">;
  key: number;
  updateStatuses: () => void;
  status?: FormattedStatus;
  numberOfStatuses: number;
}
export const StatusRow = (props: Props<FormValues>) => {
  const { showSnackBar } = useSnackBar();
  const { STATUS_MESSAGES } = RESPONSE_MESSAGES;
  const {
    register,
    control,
    remove,
    index,
    setValue,
    getValues,
    updateStatuses,
    numberOfStatuses,
  } = props;
  const { AUDITION_FORM } = CY_TAGS;
  const handleDelete = async () => {
    if (getValues().statuses[index].id) {
      try {
        await deleteStatus(getValues().statuses[index].id as number);
        showSnackBar(STATUS_MESSAGES.STATUS_DELETE_SUCCESS, "success");
        return true;
      } catch {
        showSnackBar(STATUS_MESSAGES.STATUS_DELETE_FAILURE, "error");
        return false;
      }
    } else {
      return true;
    }
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        wrap="nowrap"
        data-cy={AUDITION_FORM.FORMS.STATUS_CHANGE.STATUS_ROW + `${index}`}
      >
        <Grid item>
          <StatusDropdown
            control={control}
            index={index}
            updateStatuses={updateStatuses}
            setValue={setValue}
            register={register}
          />
        </Grid>
        <Grid item>
          <StatusDatePicker
            control={control}
            index={index}
            updateStatuses={updateStatuses}
            setValue={setValue}
            register={register}
            defaultValue={getValues().statuses[index].date}
          />
        </Grid>
        <Grid item>
          {numberOfStatuses > 1 && (
            <IconButton
              data-cy={
                AUDITION_FORM.FORMS.STATUS_CHANGE.BUTTONS.DELETE_STATUS +
                `${index}`
              }
              onClick={() => {
                handleDelete().then(() => {
                  remove(index);
                });
              }}
            >
              <RemoveCircle fontSize="small" color="error" />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </>
  );
};
