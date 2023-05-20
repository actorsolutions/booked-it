import React, { useState } from "react";
import {
  DatePicker,
  NotesTextArea,
  ProjectInput,
  StatusDropdown,
  TypeDropdown,
  CompanyInput,
  CallbackPicker,
  CastingRow,
} from "@/components/AuditionForm/components";
import { Casting } from "@/types/auditions";
import { CastingForm } from "./components/CastingForm/CastingForm";
import { useForm } from "react-hook-form";
import { AuditionFormData } from "../AuditionForm";
import { Form } from "@/components/common/Form";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider } from "@mui/material";
import { createAudition } from "@/apihelpers/auditions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
export const AuditionForm = () => {
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
    const createdAudition = await createAudition(getValues());
    // TODO - Add to list / refresh list when added
  };

  const setCasting = (castingArray: Casting[]) => {
    setValue("casting", castingArray);
  };
  return (
    <Container maxWidth="md" id="auditionModal">
      <Divider />
      <Form>
        <Grid item sm={8} md={6}>
          <DatePicker control={control} />
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
                return <CastingRow key={index} name={person.name} />;
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
          onClick={() => {
            handleCreate();
          }}
        >
          Add Audition
        </Button>
      </Form>
    </Container>
  );
};
