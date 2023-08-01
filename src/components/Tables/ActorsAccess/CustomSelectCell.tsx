import React from "react";
import { ICellRendererParams } from "ag-grid-community";

interface CustomSelectCell extends ICellRendererParams {
  value: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void;
}
export const SelectTypeRenderer = (params: CustomSelectCell) => {
  const typeItems = [
    { value: "television", label: "Television" },
    { value: "film", label: "Film" },
    { value: "student", label: "Student" },
    { value: "theater", label: "Theater" },
    { value: "industrial", label: "Industrial" },
    { value: "commercial", label: "Commercial" },
    { value: "newMedia", label: "New Media" },
    { value: "voiceOver", label: "Voiceover" },
  ];
  const { value, setValue } = params;
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const type = typeItems.find((item) => item.value === value);
  return (
    <select data-cy={"holder"} onChange={handleChange}>
      {typeItems.map((item) => (
        <option data-cy={"holder"} key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
