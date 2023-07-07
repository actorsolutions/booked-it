import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AuditionDatePicker,
  NotesTextArea,
  ProjectInput,
  TypeDropdown,
  CompanyInput,
  CastingList,
} from "@/components/AuditionForm/components";
import { AuditionData, Casting } from "@/types/auditions";
import { CastingForm } from "./components/CastingForm/CastingForm";
import { useForm } from "react-hook-form";
import { AuditionFormData } from "../AuditionForm";
import { Form } from "@/components/common/Form";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider } from "@mui/material";
import { createAudition, updateAudition } from "@/apihelpers/auditions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CY_TAGS from "@/support/cypress_tags";
import RESPONSE_MESSAGES from "@/support/response_messages";
import { LoadingCircle, ValidationRequiredMessage } from "@/components/common";
import { useSnackBar } from "@/context/SnackbarContext";
import { StatusChangeForm } from "@/components/AuditionForm/components/StatusChange/StatusChange.form";
import { FormattedStatus } from "@/types/statuschange";
import { EMPTY_STATUS_ROW } from "@/components/AuditionForm/components/StatusChange";
import { audition_statuses } from "@prisma/client";

interface Props {
  audition?: AuditionData;
  auditions: AuditionData[];
  setAuditions: Dispatch<SetStateAction<AuditionData[]>>;
  handleClose: () => void;
}
export const AuditionForm = (props: Props) => {
  const { setAuditions, auditions, handleClose, audition } = props;
  // variable rename to help with if Adding an audition or Editing an Audition
  const editMode = audition;
  const { AUDITION_FORM } = CY_TAGS;
  const { AUDITION_MESSAGES } = RESPONSE_MESSAGES;
  const { showSnackBar } = useSnackBar();

  const [open, setOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    loading: false,
    submitted: false,
  });

  const customValidation = async (arrayOfFields: fields[]) => {
    return trigger(arrayOfFields as fields[], { shouldFocus: true });
  };

  const {
    getValues,
    control,
    watch,
    setValue,
    register,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm<AuditionFormData>({
    defaultValues: {
      date:
        audition?.date ||
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000,
      project: audition?.project || "",
      company: audition?.company || "",
      callbackDate: undefined,
      casting: audition?.casting || [],
      notes: audition?.notes || "",
      type: audition?.type || "",
      status: "submitted",
      archived: audition?.archived || false,
      statuses: audition?.statuses || [EMPTY_STATUS_ROW],
    },
  });

  const MAX_CASTING_ROWS = 2;
  const [castingRowCount, setCastingRowCount] = useState(
    getValues().casting?.length || 0
  );

  interface SubmissionState {
    loading: boolean;
    submitted: boolean;
  }

  type fields =
    | "date"
    | "project"
    | "company"
    | "callbackDate"
    | "notes"
    | "type"
    | "status";

  const createFields = [
    "date",
    "project",
    "company",
    "callbackDate",
    "notes",
    "type",
    "status",
  ];

  const watchCasting = watch("casting");

  const handleModal = () => {
    if (castingRowCount < MAX_CASTING_ROWS) {
      setOpen(true);
    }
    setOpen(!open);
  };

  /**
   * Handles Editing an audition
   */
  const handleEdit = async (audition: AuditionData) => {
    const values = getValues();
    const updateData = {
      ...values,
      date: values.date / 1000,
      casting: watchCasting,
      id: audition.id,
      userId: audition.userId,
      createdAt: audition.createdAt,
      callbackDate: audition.callBackDate,
      statuses: getValues().statuses,
    };
    const response = await updateAudition(updateData as AuditionData);
    const auditionToReplace = auditions.find(
      (audition) => audition.id === response.id
    ) as AuditionData;
    Object.assign(auditionToReplace, response);
    setCastingRowCount(watchCasting ? watchCasting.length : 0);
  };

  /**
   * Handles creating an audition
   */
  const handleCreate = async () => {
    try {
      const addedAudition = await createAudition(getValues());
      auditions.push(addedAudition);
      setAuditions(auditions);
      setSubmissionState({
        loading: false,
        submitted: true,
      });
      showSnackBar(AUDITION_MESSAGES.AUDITION_CREATE_SUCCESS, "success");
      setCastingRowCount(watchCasting ? watchCasting.length : 0);
      return true;
    } catch (error) {
      console.log(error);
      showSnackBar(AUDITION_MESSAGES.AUDITION_CREATE_FAILURE, "error");
    }
  };
  /**
   * Triggers Validation on form, will not send to API if form is not valid
   * Determines if a PUT or POST create depending on if audition is send along in props.
   */
  const handleClick = async () => {
    setSubmissionState({
      loading: true,
      submitted: false,
    });
    if (await customValidation(createFields as fields[])) {
      setStatusesType(getValues().statuses);
      editMode ? await handleEdit(audition) : await handleCreate();
      return true;
    } else {
      setSubmissionState({
        loading: false,
        submitted: false,
      });
      showSnackBar(AUDITION_MESSAGES.AUDITION_CREATE_VALIDATION_ERROR, "error");
      return false;
    }
  };

  const setCasting = (castingArray: Casting[]) => {
    setValue("casting", castingArray);
  };
  const setStatuses = (statusesArray: FormattedStatus[]) => {
    setValue("statuses", statusesArray);
  };
  /**
   * Takes the statusId and fills in the correct type.
   * @param statusesArray
   */
  const setStatusesType = (statusesArray: FormattedStatus[]) => {
    statusesArray.forEach((status) => {
      status.type = Object.values(audition_statuses)[status.statusId];
    });
  };

  return (
    <Container
      data-cy={AUDITION_FORM.CONTAINERS.FORM_CONTAINER}
      maxWidth="md"
      id="auditionModal"
    >
      <Divider />
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AuditionDatePicker
              control={control}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            {errors.date && (
              <ValidationRequiredMessage
                errorCyTag={AUDITION_FORM.ERRORS.DATE}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: "#616161" }} />
            <ProjectInput control={control} register={register} />
            {errors.project && (
              <ValidationRequiredMessage
                errorCyTag={AUDITION_FORM.ERRORS.PROJECT}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <StatusChangeForm
              setStatuses={setStatuses}
              statuses={getValues("statuses")}
            />
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TypeDropdown control={control} register={register} />
            {errors.type && (
              <ValidationRequiredMessage
                errorCyTag={AUDITION_FORM.ERRORS.TYPE}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <CompanyInput control={control} register={register} />
            {errors.company && (
              <ValidationRequiredMessage
                errorCyTag={AUDITION_FORM.ERRORS.COMPANY}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {watchCasting ? (
              <CastingList
                casting={watchCasting}
                setCasting={setCasting}
                listCyTag={AUDITION_FORM.CASTING.CASTING_LIST}
              />
            ) : null}
          </Grid>
          {watchCasting && watchCasting.length < MAX_CASTING_ROWS && (
            <Grid item container xs={12} justifyContent={"right"}>
              <Button
                data-cy={AUDITION_FORM.BUTTONS.ADD_CASTING}
                onClick={handleModal}
              >
                Add Casting
              </Button>
              <Dialog open={open} onClose={handleModal}>
                <DialogContent>
                  <CastingForm
                    auditionControl={control}
                    initialCastingList={getValues().casting}
                    setCasting={setCasting}
                    handleClose={handleModal}
                  />
                </DialogContent>
              </Dialog>
            </Grid>
          )}
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: "#616161" }} />
            <NotesTextArea control={control} register={register} />
          </Grid>
          <Grid item container xs={12} justifyContent={"right"}>
            <Button
              data-cy={
                editMode
                  ? AUDITION_FORM.BUTTONS.EDIT_AUDITION
                  : AUDITION_FORM.BUTTONS.ADD_AUDITION
              }
              onClick={() => {
                clearErrors();
                handleClick().then((wasSent) => {
                  wasSent && handleClose();
                });
              }}
            >
              {editMode ? "Edit Audition" : "Add Audition"}
            </Button>
            {submissionState.loading && <LoadingCircle />}
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
