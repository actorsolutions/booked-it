import CY_TAGS from "@/support/cypress_tags";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { scrapeAuditions } from "@/apihelpers/actorsAccess";
import {
  SelectTypeRenderer,
  SelectTypeDropdown,
} from "@/components/Tables/ActorsAccess/CustomSelectCell";

export const ActorsAccessGrid = (props: any) => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    scrapeAuditions().then((response) => {
      const auditionArray = response.data;
      auditionArray.forEach((audition) => (audition.type = "television"));
      setRowData(auditionArray);
    });
  }, []);
  const createAuditionObject = (node) => {
    const { status, date, link, project, casting, type } = node.data;
    return {
      statuses: [{ type: "auditioned", date: date / 1000 }],
      casting: [casting],
      project: project,
      date: date / 1000,
      notes: `URL: ${link}, imported from Actors Access`,
      archived: true,
    };
  };
  const handleSubmit = () => {
    const auditions = [];
    gridRef.current.api.forEachNode((node) =>
      auditions.push(createAuditionObject(node))
    );
    console.log(auditions);
  };

  function dateFormatter(params) {
    const date = params.data.date;
    return new Date(date).toLocaleDateString("en-US");
  }
  const [columnDefs] = useState([
    { field: "project" },
    { field: "role" },
    { field: "casting" },
    // { field: "link" },
    {
      field: "type",
      cellRenderer: SelectTypeRenderer,
      suppressClickEdit: true,
    },
    { field: "date", valueFormatter: dateFormatter, editable: false },
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
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};
