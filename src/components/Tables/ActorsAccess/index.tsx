import CY_TAGS from "@/support/cypress_tags";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { scrapeAuditions } from "@/apihelpers/actorsAccess";
import { SelectTypeRenderer } from "@/components/Tables/ActorsAccess/CustomSelectCell";
import {
  ColDef,
  ColGroupDef,
  IRowNode,
  ValueFormatterParams,
} from "ag-grid-community";
import { CreateAuditionData } from "@/types";

interface ActorsAccessData {
  status: string;
  date: Date;
  link: string;
  casting: string;
  project: string;
  type?: string;
}
export const ActorsAccessGrid = () => {
  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    scrapeAuditions().then((response) => {
      const auditionArray = response.data;
      auditionArray.forEach((audition: ActorsAccessData) => {
        if (audition.project === "") {
          audition.project = "UNKNOWN";
        }
        audition.type = "television";
      });
      setRowData(auditionArray);
    });
  }, []);

  /**
   * Creates Data Object which can be sent to the API
   * @param node
   */
  const createAuditionObject = (node: IRowNode) => {
    const { date, link, project, casting, type } = node.data;
    return {
      statuses: [{ type: "auditioned", date: date / 1000, statusId: 2 }],
      casting: [casting],
      project: project,
      date: date / 1000,
      notes: `URL: ${link}, imported from Actors Access`,
      archived: true,
      company: "UNKNOWN",
      type,
    };
  };
  const handleSubmit = () => {
    const auditions: CreateAuditionData[] = [];
    gridRef.current?.api.forEachNode((node) =>
      auditions.push(createAuditionObject(node))
    );
    console.log(auditions);
  };

  /**
   * Formats date for AG-Grid Purposes
   * @param params
   */
  function dateFormatter(params: ValueFormatterParams) {
    const date = params.data.date;
    return new Date(date).toLocaleDateString("en-US");
  }
  const columnDefs: ColDef[] | ColGroupDef = [
    { field: "project" },
    { field: "role" },
    { field: "casting" },
    {
      field: "type",
      cellRenderer: SelectTypeRenderer,
      editable: false,
    },
    {
      field: "date",
      valueFormatter: dateFormatter,
      editable: false,
      sortingOrder: ["asc", "desc"],
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
      sortable: true,
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
        <button onClick={handleSubmit}>Import</button>
      </div>
    </>
  );
};
