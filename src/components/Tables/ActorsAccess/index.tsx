import CY_TAGS from "@/support/cypress_tags";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";

export const ActorsAccessGrid = (props: any) => {
  const { data } = props;
  const colors = ["Red", "Green", "Blue"];
  useEffect(() => {}, [data]);
  const [rowData] = useState(data);

  const [columnDefs] = useState([
    { field: "status" },
    { field: "project" },
    { field: "role" },
    { field: "casting" },
    { field: "link" },
    { field: "date" },
    {
      field: "type",
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
        style={{ height: "100vh", width: "100%" }}
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
