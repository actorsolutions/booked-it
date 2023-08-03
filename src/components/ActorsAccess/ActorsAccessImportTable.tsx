import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useRef } from "react";
import { ColDef, IRowNode, ValueFormatterParams } from "ag-grid-community";
import { CreateAuditionData } from "@/types";
import { SelectTypeRenderer } from "@/components/ActorsAccess/CustomSelectCell";
import { ActorsAccessData } from "@/components/ActorsAccess/index";

interface Props {
  rowData: ActorsAccessData[];
}

export const ActorsAccessImportTable = (props: Props) => {
  const { rowData } = props;
  const gridRef = useRef<AgGridReact>(null);

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

  const columnDefs: ColDef<ActorsAccessData>[] = [
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
