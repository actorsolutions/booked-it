import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useRef } from "react";
import { ColDef, IRowNode, ValueFormatterParams } from "ag-grid-community";
import { CreateAuditionData } from "@/types";
import { SelectTypeRenderer } from "@/components/ActorsAccess/CustomSelectCell";
import { ActorsAccessData } from "@/components/ActorsAccess/index";
import { Button, Grid } from "@mui/material";
import { createManyAuditions } from "@/apihelpers/auditions";
import { useRouter } from "next/navigation";
import { useSnackBar } from "@/context/SnackbarContext";
import RESPONSE_MESSAGES from "@/support/response_messages";

interface Props {
  rowData: ActorsAccessData[];
}

export const ActorsAccessImportTable = (props: Props) => {
  const { push } = useRouter();
  const { showSnackBar } = useSnackBar();
  const { rowData } = props;
  const gridRef = useRef<AgGridReact>(null);
  const { AUDITION_MESSAGES } = RESPONSE_MESSAGES;

  /**
   * Creates Data Object which can be sent to the API
   * @param node
   */
  const createAuditionObject = (node: IRowNode) => {
    const { date, link, project, casting, type } = node.data;
    return {
      statuses: [{ date: date / 1000, statusId: 2, type: "auditioned" }],
      casting: [casting],
      project: project,
      date: date / 1000,
      notes: `URL: ${link}, imported from Actors Access`,
      archived: true,
      company: "UNKNOWN",
      type,
    };
  };
  const handleSubmit = async () => {
    const auditions: CreateAuditionData[] = [];
    gridRef.current?.api.forEachNode((node) =>
      auditions.push(createAuditionObject(node))
    );
    const count = await createManyAuditions(auditions);
    if (count) {
      showSnackBar(
        auditions.length + " " + AUDITION_MESSAGES.AUDITION_IMPORT_SUCCESS,
        "success"
      );
      push("/");
    }
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
    <Grid container direction="column">
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
      </div>

      <Button variant="contained" onClick={handleSubmit}>
        Import
      </Button>
    </Grid>
  );
};
