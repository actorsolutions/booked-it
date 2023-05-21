import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AuditionDatePicker,
  NotesTextArea,
  ProjectInput,
  StatusDropdown,
  TypeDropdown,
  CompanyInput,
  CallbackPicker,
  CastingRow,
} from "@/components/AuditionForm/components";
import { Audition, Casting } from "@/types/auditions";
import { CastingForm } from "./components/CastingForm/CastingForm";
import { useForm } from "react-hook-form";
import { AuditionFormData } from "../AuditionForm";
import { Form } from "@/components/common/Form";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider } from "@mui/material";
import { createAudition } from "@/apihelpers/auditions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CY_TAGS from "@/support/cypress_tags";
interface Props {
  auditions: Audition[];
  setAuditions: Dispatch<SetStateAction<Audition[]>>;
  handleClose: () => void;
}
export const AuditionForm = (props: Props) => {
  const { AUDITION_FORM } = CY_TAGS;
  const { setAuditions, auditions, handleClose } = props;

  const { getValues, control, watch, setValue } = useForm<AuditionFormData>({
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
  const [open, setOpen] = useState(false);

  const watchStatus = watch("status");
  const watchCasting = watch("casting");

  const handleModal = () => setOpen(!open);
  const handleCreate = async () => {
    const addedAudition = await createAudition(getValues());
    auditions.push(addedAudition);
    setAuditions(auditions);
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
          <AuditionDatePicker control={control} />
        </Grid>
        <Grid item sm={8} md={6}>
          <ProjectInput control={control} />
          <CompanyInput control={control} />
        </Grid>
        <Grid item sm={8} md={6}>
          <StatusDropdown control={control} />
          <TypeDropdown control={control} />
        </Grid>
        {watchStatus === "callback" && <CallbackPicker control={control} />}
        <Grid item sm={8} md={6}>
          <NotesTextArea control={control} />
        </Grid>
        <Grid item sm={8}>
          {watchCasting
            ? watchCasting.map((person, index) => {
                return <CastingRow key={index} name={person?.name || ""} />;
              })
            : null}
        </Grid>
        <Grid item sm={8} md={6}>
          <Button
            onClick={() => {
              handleModal();
            }}
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
        <Button
          data-cy={AUDITION_FORM.BUTTONS.ADD_AUDITION}
          onClick={() => {
            handleCreate().then(() => {
              handleClose();
            });
          }}
        >
          Add Audition
        </Button>
      </Form>
    </Container>
  );
};
