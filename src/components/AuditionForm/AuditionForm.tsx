import React, { Dispatch, SetStateAction, useState } from "react";
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
import { createAudition } from "@/apihelpers/auditions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CY_TAGS from "@/support/cypress_tags";
import SNACKBAR_MESSAGES from "@/support/snackbar_messages";
import { LoadingCircle } from "@/components/common";
import {useSnackBar} from "@/support/SnackbarContext";

interface Props {
  auditions: Audition[];
  setAuditions: Dispatch<SetStateAction<Audition[]>>;
  handleClose: () => void;
}
export const AuditionForm = (props: Props) => {
  const { AUDITION_FORM } = CY_TAGS;
  const { AUDITIONS } = SNACKBAR_MESSAGES
  const { setAuditions, auditions, handleClose } = props;
  const {showSnackBar} = useSnackBar();

  const customValidation = async (arrayOfFields: fields[]) => {
    return trigger(arrayOfFields as fields[], { shouldFocus: true });
  };

  const [open, setOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    loading: false,
    submitted: false,
  });

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
  }

  /**
   * Triggers Validation on form, will not send to API if form is not valid
   */
  const handleCreate = async () => {
    setSubmissionState({
      loading: true,
      submitted: false,
    });
    if (await customValidation(createFields as fields[])) {
      try {
        const addedAudition = await createAudition(getValues());
        auditions.push(addedAudition);
        setAuditions(auditions);
        setSubmissionState({
          loading: false,
          submitted: true,
        });
        showSnackBar(AUDITIONS.AUDITION_CREATE_SUCCESS, "success");
        setCastingRowCount(watchCasting ? watchCasting.length : 0);
        return true;
      } catch (error) {
        console.log(error);
        showSnackBar(AUDITIONS.AUDITION_CREATE_FAILURE, "error");
      }
    } else {
      setSubmissionState({
        loading: false,
        submitted: false,
      });
      showSnackBar(AUDITIONS.AUDITION_CREATE_VALIDATION_ERROR, "error")
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
  return (
    <Container
      data-cy={AUDITION_FORM.CONTAINERS.FORM_CONTAINER}
      maxWidth="md"
      id="auditionModal"
    >
      <Divider />
      <Form>
        <Grid item sm={8} md={6}>
          <AuditionDatePicker control={control} register={register} />
          {errors.date && (
            <Typography data-cy={AUDITION_FORM.ERRORS.DATE} variant="overline">
              Required!
            </Typography>
          )}
        </Grid>
        <Grid item sm={8} md={6}>
          <ProjectInput control={control} register={register} />
          {errors.project && (
            <Typography
              data-cy={AUDITION_FORM.ERRORS.PROJECT}
              variant="overline"
            >
              Required!
            </Typography>
          )}
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
        <Grid item sm={8} md={6}>
          <StatusDropdown control={control} register={register} />
          {errors.status && (
            <Typography
              data-cy={AUDITION_FORM.ERRORS.STATUS}
              variant="overline"
            >
              Required!
            </Typography>
          )}
          <TypeDropdown control={control} register={register} />
          {errors.type && (
            <Typography data-cy={AUDITION_FORM.ERRORS.TYPE} variant="overline">
              Required!
            </Typography>
          )}
        </Grid>
        {watchStatus === "callback" && (
          <CallbackPicker control={control} register={register} />
        )}
        <Grid item sm={8} md={6}>
          <NotesTextArea control={control} register={register} />
        </Grid>
        <Grid item sm={8}>
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
            <Grid item sm={8} md={6}>
              <Button
                  data-cy={AUDITION_FORM.BUTTONS.ADD_CASTING}
                  onClick={handleModal}>
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
        <Button
          data-cy={AUDITION_FORM.BUTTONS.ADD_AUDITION}
          onClick={ () => {
            clearErrors();
            handleCreate().then((wasSent) => {
              wasSent && handleClose();
            });
          }}
        >
          Add Audition
        </Button>
        {submissionState.loading && <LoadingCircle />}
      </Form>
    </Container>
  );
};
