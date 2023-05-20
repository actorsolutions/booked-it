import React from "react";
import { Button } from "@mui/material";
import { CastingPersonFormData } from "./index";

interface Props {
  append: (value: CastingPersonFormData) => void;
}

const EMPTY_CASTING_PERSON = {
  fName: "",
  lName: "",
  company: "",
  role: "",
};

export const AddCastingPerson = (props: Props) => {
  return (
    <Button
      onClick={() => {
        props.append(EMPTY_CASTING_PERSON);
      }}
    >
      Add Casting Person
    </Button>
  );
};
