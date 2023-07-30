import CY_TAGS from "@/support/cypress_tags";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import { scrapeAuditions } from "@/apihelpers/actorsAccess";
import MenuItem from "@mui/material/MenuItem";

export const ActorsAccessGrid = (props: any) => {
  const { data } = props;
  const colors = ["Red", "Green", "Blue"];
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    scrapeAuditions().then((auditions) => {
      setRowData(auditions.data);
    });
  }, []);

  const testComponent = () => {
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
    return (
      <select>
        {typeItems.map((item) => (
          <option value={item.value}> {item.label} </option>
        ))}
      </select>
    );
  };
  function dateFormatter(params) {
    const date = params.data.date;
    return new Date(date).toLocaleDateString("en-US");
  }
  const [columnDefs] = useState([
    { field: "project" },
    { field: "role" },
    { field: "casting" },
    { field: "link" },
    { field: "date", valueFormatter: dateFormatter },
    {
      field: "type",
      cellRenderer: testComponent,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: colors,
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
    };
  }, []);

  return (
    <>
      <h1 data-cy={CY_TAGS.REPORTS.TITLE}>Actors Access</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: "50vh", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </>
  );
};
