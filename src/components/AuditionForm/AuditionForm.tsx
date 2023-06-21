import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  AuditionDatePicker,
  NotesTextArea,
  ProjectInput,
  StatusDropdown,
  TypeDropdown,
  CompanyInput,
  CallbackPicker,
  CastingList,
} from "@/components/AuditionForm/components";
import { Audition, Casting } from "@/types/auditions";
import { CastingForm } from "./components/CastingForm/CastingForm";
import { useForm } from "react-hook-form";
import { AuditionFormData } from "../AuditionForm";
import { Form } from "@/components/common/Form";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider, Typography } from "@mui/material";
import { createAudition, updateAudition } from "@/apihelpers/auditions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CY_TAGS from "@/support/cypress_tags";
import RESPONSE_MESSAGES from "@/support/response_messages";
import { LoadingCircle } from "@/components/common";
import { useSnackBar } from "@/context/SnackbarContext";

interface Props {
  audition?: Audition;
  auditions: Audition[];
  setAuditions: Dispatch<SetStateAction<Audition[]>>;
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
    reset,
  } = useForm<AuditionFormData>({
    defaultValues: {
      date: undefined,
      project: "",
      company: "",
      callbackDate: undefined,
      casting: [],
      notes: "",
      type: "",
      status: "",
      archived: false,
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

  const watchStatus = watch("status");
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
  const handleEdit = async (audition: Audition) => {
    const values = getValues();
    const updateData = {
      ...values,
      date: values.date / 1000,
      casting: watchCasting,
      id: audition.id,
      userId: audition.userId,
      createdAt: audition.createdAt,
      callbackDate: audition.callBackDate,
    };
    const response = await updateAudition(updateData as Audition);
    const auditionToReplace = auditions.find(
      (audition) => audition.id === response.id
    ) as Audition;
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

  // TODO - BI-72 Refactor handleDeleteCastingRow to live in CastingList
  const handleDeleteCastingRow = (index: number) => {
    const updatedCasting = [...(watchCasting || [])];
    updatedCasting.splice(index, 1);
    setValue("casting", updatedCasting);
  };

  const setCasting = (castingArray: Casting[]) => {
    setValue("casting", castingArray);
  };
  useEffect(() => {
    if (editMode) {
      const data = {
        archived: audition.archived,
        callbackDate: audition.callBackDate
          ? audition.callBackDate * 1000
          : undefined,
        casting: audition.casting || [],
        company: audition.company,
        date: audition.date * 1000,
        notes: audition.notes,
        project: audition.project,
        status: audition.status,
        type: audition.type,
      };
      reset({ ...data });
    }
  }, [editMode, reset]);

  return (
      <Container
          data-cy={AUDITION_FORM.CONTAINERS.FORM_CONTAINER}
          maxWidth="md"
          id="auditionModal"
          justify-content={"center"}
      >
        <Divider />
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AuditionDatePicker control={control} register={register} />
              {errors.date && (
                  <Typography data-cy={AUDITION_FORM.ERRORS.DATE} variant="overline">
                    Required!
                  </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <ProjectInput control={control} register={register} />
              {errors.project && (
                  <Typography
                      data-cy={AUDITION_FORM.ERRORS.PROJECT}
                      variant="overline"
                  >
                    Required!
                  </Typography>
              )}
            </Grid>
              <Grid item xs={12}>
                <StatusDropdown control={control} register={register} />
                {errors.status && (
                    <Typography
                        data-cy={AUDITION_FORM.ERRORS.STATUS}
                        variant="overline"
                    >
                      Required!
                    </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TypeDropdown control={control} register={register} />
                {errors.type && (
                    <Typography data-cy={AUDITION_FORM.ERRORS.TYPE} variant="overline">
                      Required!
                    </Typography>
                )}
              </Grid>
            {watchStatus === "callback" && (
                <Grid item xs={12}>
                  <CallbackPicker control={control} register={register} />
                </Grid>
            )}
            <Grid item xs={12}>
              <CompanyInput control={control} register={register} />
              {errors.company && (
                  <Typography
                      data-cy={AUDITION_FORM.ERRORS.COMPANY}
                      variant="overline"
                  >
                    Required!
                  </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {watchCasting ? (
                  <CastingList
                      casting={watchCasting}
                      onDelete={handleDeleteCastingRow}
                      name={""}
                      listCyTag={AUDITION_FORM.CASTING.CASTING_LIST}
                  />
              ) : null}
            </Grid>
            {watchCasting && watchCasting.length < MAX_CASTING_ROWS && (
                <Grid item xs={12}>
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
              <NotesTextArea control={control} register={register} />
            </Grid>
            <Grid item xs={12}>
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
